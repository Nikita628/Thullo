using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.Models;

namespace Thullo.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
		private readonly IPexelsService _pexels;
		private readonly IMapper _mapper;

		public CommonController(IPexelsService aus, IMapper m)
		{
			_pexels = aus;
			_mapper = m;
		}

		[HttpPost("searchPexels")]
		public async Task<IActionResult> SearchPexels(PexelsPhotoSearchParam param)
		{
			var result = await _pexels.SearchPhotos(param);

			return Ok(result);
		}
	}
}
