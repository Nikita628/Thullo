using System.Threading.Tasks;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
    public interface ICardAttachmentService
	{
		Task<Response<int>> Create(FileData file, int cardId);
		Task<Response<bool>> Delete(int attachmentId);
		Task<Response<object>> Download(int attachmentId);
	}
}
