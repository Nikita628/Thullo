using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;
using Thullo.Application.DbModel;

namespace Thullo.Application.Services
{
	public class CurrentUserAccessor
	{
		public readonly User CurrentUser;

		public CurrentUserAccessor(UserManager<User> um, IHttpContextAccessor ca)
		{
			if (ca.HttpContext.User != null 
				&& ca.HttpContext.User.Claims != null 
				&& ca.HttpContext.User.Claims.Any())
			{
				var currentUserId = ca.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
				CurrentUser = um.FindByIdAsync(currentUserId).Result;
			}
		}
	}
}
