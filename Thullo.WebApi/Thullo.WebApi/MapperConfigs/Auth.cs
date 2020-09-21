using AutoMapper;

namespace Thullo.WebApi.MapperConfigs
{
    public class AuthProfile : Profile
	{
		public AuthProfile()
		{
			CreateMap<Application.Models.SignInResult, Dtos.Auth.SignInResult>();
		}
	}
}
