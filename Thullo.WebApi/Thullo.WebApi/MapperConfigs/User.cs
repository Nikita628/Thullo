using AutoMapper;
using Thullo.Application.Models;

namespace Thullo.WebApi.MapperConfigs
{
    public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<Application.DbModel.User, Dtos.User.User>();
			CreateMap<PageResponse<Application.DbModel.User>, PageResponse<Dtos.User.User>>();
		}
	}
}
