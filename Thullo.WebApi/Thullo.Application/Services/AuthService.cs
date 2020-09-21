using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
	public class AuthService : IAuthService
	{
        private readonly AppSettings _appSetting;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ThulloDbContext _db;
        private readonly ICloudService _cloudService;

        public AuthService(
            IOptions<AppSettings> aps,
            UserManager<User> um,
            SignInManager<User> sm,
            ThulloDbContext db,
            ICloudService cs
        )
		{
            _appSetting = aps.Value;
            _userManager = um;
            _signInManager = sm;
            _db = db;
            _cloudService = cs;
		}

		public async Task<Response<Models.SignInResult>> SignIn(string login, string password)
		{
            var result = new Response<Models.SignInResult>();

            if (string.IsNullOrWhiteSpace(login))
			{
                result.Errors.Add("Login is empty");
                return result;
			}

            if (string.IsNullOrWhiteSpace(password))
			{
                result.Errors.Add("Password is empty");
                return result;
			}

            var user = await _userManager.FindByNameAsync(login);

            if (user is null)
			{
                result.Errors.Add("Incorrect login and/or password");
                return result;
			}

            var res = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            if (res.Succeeded)
			{
                var signInResult = new Models.SignInResult
                {
                    User = await _db.Users.Include(u => u.Img).FirstAsync(u => u.Id == user.Id),
                    Token = GenerateJwtToken(user)
                };

                result.Item = signInResult;
			}
            else
			{
                result.Errors.Add("Incorrect login and/or password");
			}

            return result;
		}

		public async Task<Response<bool>> SignUp(SignUpData signUpData)
		{
            var result = new Response<bool>();

            if (string.IsNullOrWhiteSpace(signUpData.Email)) result.Errors.Add("Email is empty");
            if (string.IsNullOrWhiteSpace(signUpData.FirstName)) result.Errors.Add("First name is empty");
            if (string.IsNullOrWhiteSpace(signUpData.LastName)) result.Errors.Add("Last name is empty");
            if (string.IsNullOrWhiteSpace(signUpData.Password)) result.Errors.Add("Password is empty");
            if (result.Errors.Any()) return result;

            var existingUser = await _userManager.FindByNameAsync(signUpData.Email);

            if (existingUser != null)
			{
                result.Errors.Add($"User {signUpData.Email} already exists");
                return result;
			}

            var user = new User
            {
                FirstName = signUpData.FirstName,
                LastName = signUpData.LastName,
                UserName = signUpData.Email,
                Email = signUpData.Email
            };

            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (signUpData.Img != null)
                    {
                        var uploadResult = await _cloudService.UploadAsync(signUpData.Img);
                        var file = new File
                        {
                            Name = signUpData.Img.FileName,
                            Url = uploadResult.Url,
                            StorageData = uploadResult.PublicId
                        };
                        await _db.Files.AddAsync(file);
                        await _db.SaveChangesAsync();
                        user.ImgId = file.Id;
                    }

                    var res = await _userManager.CreateAsync(user, signUpData.Password);

                    if (res.Errors.Any())
                        result.Errors.AddRange(res.Errors.Select(e => e.Description));
                    else result.Item = true;

                    transaction.Commit();
                }
                catch (Exception e)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
            
            return result;
		}

		private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSetting.TokenSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
