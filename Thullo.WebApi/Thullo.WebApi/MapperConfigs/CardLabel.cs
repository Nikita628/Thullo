using AutoMapper;

namespace Thullo.WebApi.MapperConfigs
{
	public class CardLabel : Profile
	{
		public CardLabel()
		{
			CreateMap<Application.DbModel.CardLabel, Dtos.CardLabel.CardLabel>();
		}
	}
}
