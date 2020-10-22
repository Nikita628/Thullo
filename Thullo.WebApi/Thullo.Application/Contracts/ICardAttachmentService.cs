using System.Threading.Tasks;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
    public interface ICardAttachmentService
	{
		Task<Response<CardAttachment>> Create(FileData file, int cardId);
		Task<Response<bool>> Delete(int attachmentId);
		Task<Response<object>> Download(int attachmentId);
	}
}
