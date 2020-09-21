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
}
