using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.Contracts;
using Thullo.Application.Models;
using Thullo.WebApi.Extensions;

namespace Thullo.WebApi.Controllers
{
    [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;
		private readonly IMapper _mapper;

		public AuthController(IAuthService aus, IMapper m)
		{
			_authService = aus;
			_mapper = m;
		}

		[HttpPost]
		public async Task<IActionResult> SignIn(string login, string password)
		{
			var res = await _authService.SignIn(login, password);
			
			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPost]
		public async Task<IActionResult> SignUp([FromForm]IFormFile userImg, [FromForm]string signUpDataJson)
        {
			var file = new FileData
			{
				FileName = userImg.FileName,
				Bytes = await userImg.ToByteArrayAsync()
			};

			var signUpData = JsonConvert.DeserializeObject<SignUpData>(signUpDataJson);

			signUpData.Img = file;

			var res = await _authService.SignUp(signUpData);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
        }
	}
}
