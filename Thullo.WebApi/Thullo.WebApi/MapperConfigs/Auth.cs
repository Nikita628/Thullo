using AutoMapper;
using Thullo.Application.Models;

namespace Thullo.WebApi.MapperConfigs
{
    public class AuthProfile : Profile
	{
		public AuthProfile()
		{
			CreateMap<Application.Models.SignInResult, Dtos.Auth.SignInResult>();
			CreateMap<Response<Application.Models.SignInResult>, Response<Dtos.Auth.SignInResult>>();
		}
	}
}
