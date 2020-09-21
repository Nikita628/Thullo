using AutoMapper;

namespace Thullo.WebApi.MapperConfigs
{
    public class BoardListProfile : Profile
    {
        public BoardListProfile()
        {
            CreateMap<Application.DbModel.BoardList, Dtos.BoardList.BoardList>();
        }
    }
}
