using PexelsDotNetSDK.Models;
using System.Threading.Tasks;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
    public interface IPexelsService
    {
        public Task<PageResponse<Photo>> SearchPhotos(PexelsPhotoSearchParam param);
    }
}
