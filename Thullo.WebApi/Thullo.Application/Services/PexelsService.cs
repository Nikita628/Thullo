using Microsoft.Extensions.Options;
using PexelsDotNetSDK.Api;
using PexelsDotNetSDK.Models;
using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.Contracts;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class PexelsService : IPexelsService
    {
        private readonly AppSettings _appSettings;

        public PexelsService(IOptions<AppSettings> opt)
        {
            _appSettings = opt.Value;
        }

        public async Task<PageResponse<Photo>> SearchPhotos(PexelsPhotoSearchParam param)
        {
            var result = new PageResponse<Photo>();
            var pexelsClient = new PexelsClient(_appSettings.PexelsAPIkey);
            var pexelsPage = await pexelsClient.SearchPhotosAsync(param.Query, param.Locale, param.Page, param.PerPage);
            result.Items = pexelsPage.photos;
            result.TotalCount = pexelsPage.totalResults;

            return result;
        }
    }
}
