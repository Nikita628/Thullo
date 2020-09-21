using AutoMapper;

namespace Thullo.WebApi.MapperConfigs
{
    public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<Application.DbModel.User, Dtos.User.User>();
		}
	}
}
