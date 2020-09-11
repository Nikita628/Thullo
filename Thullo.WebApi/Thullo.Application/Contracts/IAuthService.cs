using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
	public interface IAuthService
	{
		Task<Response<SignInResult>> SignIn(string login, string password);
		Task<Response<bool>> SignUp(SignUpData signUpData);
	}
}
