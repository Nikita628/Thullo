using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Thullo.WebApi.Controllers
{
	[Authorize]
	[ApiController]
	[Route("[controller]")]
	public class AuthController : ControllerBase
	{
		public AuthController()
		{

		}

		[HttpPost]
		public IActionResult SignIn(string login, string password)
		{

			return Ok();
		}
	}
}
