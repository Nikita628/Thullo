using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
	public interface IUserService
	{
		Task<Response<bool>> InviteToBoard(int userId, int boardId);
		Task<Response<bool>> DeleteFromBoard(int userId, int boardId);
		Task<Response<bool>> InviteToCard(int userId, int cardId);
		Task<Response<bool>> DeleteFromCard(int userId, int cardId);
		Task<PageResponse<User>> Search(UserSearchParam param);
		Task<Response<User>> Get(int userId);
		Task<Response<bool>> Update(UserUpdateData user);
	}
}
