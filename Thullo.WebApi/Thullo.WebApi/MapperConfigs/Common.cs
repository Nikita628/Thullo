using AutoMapper;

namespace Thullo.WebApi.MapperConfigs
{
    public class CommonProfile : Profile
    {
        public CommonProfile()
        {
            CreateMap<Application.DbModel.File, Dtos.Common.File>();
        }
    }
}
