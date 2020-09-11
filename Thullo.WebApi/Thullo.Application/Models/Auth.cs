using Thullo.Application.Common;
using Thullo.Application.DbModel;

namespace Thullo.Application.Models
{
	public class SignInResult
	{
		public User User { get; set; }
		public string Token { get; set; }
	}

	public class SignUpData
	{
		public string Email { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public FileData Img { get; set; }
	}
}
