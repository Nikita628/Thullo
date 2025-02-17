﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.Models;
using Thullo.WebApi.Extensions;

namespace Thullo.WebApi.Controllers
{
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

		[HttpPost("signIn")]
		public async Task<IActionResult> SignIn(Dtos.Auth.SignIn param)
		{
			var result = await _authService.SignIn(param.Login, param.Password);

			var response = _mapper.Map<Response<Dtos.Auth.SignInResult>>(result);

			return Ok(response);
		}

		[HttpPost("signUp")]
		public async Task<IActionResult> SignUp([FromForm]IFormFile userImg, [FromForm]string signUpDataJson)
        {
			var signUpData = JsonConvert.DeserializeObject<SignUpData>(signUpDataJson);

			if (userImg != null)
			{
				var file = new FileData
				{
					FileName = userImg.FileName,
					Bytes = await userImg.ToByteArrayAsync()
				};

				signUpData.Img = file;
			}

			var res = await _authService.SignUp(signUpData);

			return Ok(res);
        }
	}
}
