using AutoMapper;
using Thullo.WebApi.MapperConfigs.TypeConverters;

namespace Thullo.WebApi.MapperConfigs
{
    public class BoardProfile : Profile
    {
        public BoardProfile()
        {
            CreateMap<Application.DbModel.Board, Dtos.Board.Board>()
                .ForMember(boardDto => boardDto.Users, opt => opt.MapFrom(board => board.BoardMemberships));

            CreateMap<Application.DbModel.BoardMembership, Dtos.User.User>().ConvertUsing<BoardMembershipToUserDtoConverter>();
        }
    }
}
