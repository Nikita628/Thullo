using AutoMapper;
using Thullo.Application.Models;
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

            CreateMap<PageResponse<Application.DbModel.Board>, PageResponse<Dtos.Board.Board>>();

            CreateMap<Response<Application.DbModel.Board>, Response<Dtos.Board.Board>>();
        }
    }
}
