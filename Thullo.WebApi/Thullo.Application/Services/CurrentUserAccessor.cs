using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace Thullo.Application.Services
{
    public class CurrentUserAccessor
	{
		public readonly int CurrentUserId;

		public CurrentUserAccessor(IHttpContextAccessor ca)
		{
			if (ca.HttpContext != null
				&& ca.HttpContext.User != null 
				&& ca.HttpContext.User.Claims != null 
				&& ca.HttpContext.User.Claims.Any())
			{
				var currentUserId = ca.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
				CurrentUserId = int.Parse(currentUserId);
			}
		}
	}
}
