using AutoMapper;
using Thullo.WebApi.MapperConfigs.TypeConverters;

namespace Thullo.WebApi.MapperConfigs
{
	public class CardProfile : Profile
	{
        public CardProfile()
        {
            CreateMap<Application.DbModel.Card, Dtos.Card.Card>()
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.CardMemberships))
                .ForMember(dest => dest.Labels, opt => opt.MapFrom(src => src.LabelToCardRelations));

            CreateMap<Application.DbModel.CardMembership, Dtos.User.User>().ConvertUsing<CardMembershipToUserDtoConverter>();

            CreateMap<Application.DbModel.LabelToCardRelation, Dtos.CardLabel.CardLabel>().ConvertUsing<CardLabelRelationToLabelConverter>();
        }
    }
}
