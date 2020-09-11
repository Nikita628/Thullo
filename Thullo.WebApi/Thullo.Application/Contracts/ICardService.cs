using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.DbModel;

namespace Thullo.Application.Contracts
{
	public interface ICardService
	{
		Task<Response<Card>> Get(int cardId);
		Task<Response<int>> Create(Card card);
		Task<Response<bool>> UpdateDescription(string description, int cardId);
		Task<Response<bool>> UpdateTitle(string title, int cardId);
		Task<Response<bool>> MoveCardToList(int cardId, int listId);
		Task<Response<bool>> UpdateCoverUrl(string url, int cardId);
	}
}
