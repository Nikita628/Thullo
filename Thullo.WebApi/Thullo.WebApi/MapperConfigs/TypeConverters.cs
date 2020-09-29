using AutoMapper;

namespace Thullo.WebApi.MapperConfigs.TypeConverters
{
    public class BoardMembershipToUserDtoConverter : ITypeConverter<Application.DbModel.BoardMembership, Dtos.User.User>
    {
        private readonly IMapper _mapper;

        public BoardMembershipToUserDtoConverter(IMapper m)
        {
            _mapper = m;
        }

        public Dtos.User.User Convert(Application.DbModel.BoardMembership source, Dtos.User.User destination, ResolutionContext context)
        {
            return _mapper.Map<Dtos.User.User>(source.User);
        }
    }

    public class CardMembershipToUserDtoConverter : ITypeConverter<Application.DbModel.CardMembership, Dtos.User.User>
    {
        private readonly IMapper _mapper;

        public CardMembershipToUserDtoConverter(IMapper m)
        {
            _mapper = m;
        }

        public Dtos.User.User Convert(Application.DbModel.CardMembership source, Dtos.User.User destination, ResolutionContext context)
        {
            return _mapper.Map<Dtos.User.User>(source.User);
        }
    }

    public class CardLabelRelationToLabelConverter : ITypeConverter<Application.DbModel.LabelToCardRelation, Dtos.CardLabel.CardLabel>
    {
        private readonly IMapper _mapper;

        public CardLabelRelationToLabelConverter(IMapper m)
        {
            _mapper = m;
        }

        public Dtos.CardLabel.CardLabel Convert(Application.DbModel.LabelToCardRelation source, Dtos.CardLabel.CardLabel destination, ResolutionContext context)
        {
            return _mapper.Map<Dtos.CardLabel.CardLabel>(source.CardLabel);
        }
    }
}
