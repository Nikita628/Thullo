using System.Threading.Tasks;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

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
