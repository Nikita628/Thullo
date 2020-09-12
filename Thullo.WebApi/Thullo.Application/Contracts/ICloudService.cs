using System.Threading.Tasks;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
    public interface ICloudService
	{
		Task<CloudUploadResult> UploadAsync(FileData file);
		Task<Response<string>> DeleteAsync(string publicId);
	}
}
