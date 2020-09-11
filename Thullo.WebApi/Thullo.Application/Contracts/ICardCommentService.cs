using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.DbModel;

namespace Thullo.Application.Contracts
{
	public interface ICardCommentService
	{
		Task<Response<bool>> UpdateText(string text, int commentId);
		Task<Response<bool>> Delete(int commentId);
		Task<Response<int>> Create(CardComment comment);
	}
}
