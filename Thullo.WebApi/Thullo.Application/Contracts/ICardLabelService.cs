using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
	public interface ICardLabelService
	{
		Task<PageResponse<CardLabel>> Search(CardLabelSearchParam param);
		Task<Response<bool>> AddLabelOnCard(int labelId, int cardId);
		Task<Response<int>> CreateLabelAndAddOnCard(CardLabel label, int cardId);
	}
}
