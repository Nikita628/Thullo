using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using System.IO;
using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.Contracts;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class CloudService : ICloudService
	{
		private readonly Cloudinary _cloudinary;

		public CloudService(IOptions<CloudinarySettings> opt)
		{
			CloudinarySettings settings = opt.Value;
			Account acc = new Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
			_cloudinary = new Cloudinary(acc);
		}

		public async Task<CloudUploadResult> UploadAsync(FileData file)
		{
			using (var stream = new MemoryStream(file.Bytes))
			{
				var uploadParams = new RawUploadParams
				{
					File = new FileDescription(file.FileName, stream),
				};

				var result = await _cloudinary.UploadAsync(uploadParams);

				var uploadResult = new CloudUploadResult
				{
					Url = result.Url.ToString(),
					PublicId = result.PublicId
				};

				return uploadResult;
			}
		}

		public async Task<Response<string>> DeleteAsync(string publicId)
		{
			var response = new Response<string>();

			if (string.IsNullOrEmpty(publicId))
			{
				response.Errors.Add("Public id must be present");
				return response;
			}
			
			var deletionParams = new DeletionParams(publicId);

			var res = await _cloudinary.DestroyAsync(deletionParams);

			if (res.StatusCode != System.Net.HttpStatusCode.OK)
			{
				var err = res.Error != null ? res.Error.Message : "Error occured while deleting image";
				response.Errors.Add(err);
				return response;
			}

			response.Item = res.Result;

			return response;
		}
	}
}
