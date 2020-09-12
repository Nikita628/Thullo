using System.Threading.Tasks;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
    public interface IBoardService
	{
		Task<PageResponse<Board>> Search(BoardSearchParam param);
		Task<Response<int>> Create(Board board);
		Task<Response<bool>> UpdateVisibility(bool isPrivate, int boardId);
		Task<Response<bool>> UpdateTitle(string title, int boardId);
		Task<Response<bool>> UpdateDescription(string description, int boardId);
		Task<Response<Board>> Get(int boardId);
	}
}
