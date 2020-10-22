using AutoMapper;
using Thullo.Application.Models;
using Thullo.WebApi.MapperConfigs.TypeConverters;

namespace Thullo.WebApi.MapperConfigs
{
	public class CardProfile : Profile
	{
        public CardProfile()
        {
            CreateMap<Application.DbModel.Card, Dtos.Card.Card>()
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.CardMemberships))
                .ForMember(dest => dest.Labels, opt => opt.MapFrom(src => src.LabelToCardRelations))
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.CardComments))
                .ForMember(dest => dest.Attachments, opt => opt.MapFrom(src => src.CardAttachments));

            CreateMap<Application.DbModel.CardMembership, Dtos.User.User>().ConvertUsing<CardMembershipToUserDtoConverter>();

            CreateMap<Application.DbModel.LabelToCardRelation, Dtos.CardLabel.CardLabel>().ConvertUsing<CardLabelRelationToLabelConverter>();

            CreateMap<Application.DbModel.CardComment, Dtos.CardComment.CardComment>();

            CreateMap<Application.DbModel.CardAttachment, Dtos.CardAttachment.CardAttachment>();

            CreateMap<Response<Application.DbModel.Card>, Response<Dtos.Card.Card>>();

            CreateMap<Response<Application.DbModel.CardComment>, Response<Dtos.CardComment.CardComment>>();
        }
    }
}
