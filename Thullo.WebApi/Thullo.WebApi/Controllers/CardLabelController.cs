using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.Models;

namespace Thullo.WebApi.Controllers
{
    [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class CardLabelController : ControllerBase
	{
		private readonly ICardLabelService _labelService;
		private readonly IMapper _mapper;

		public CardLabelController(ICardLabelService bs, IMapper m)
		{
			_labelService = bs;
			_mapper = m;
		}

		[HttpPost("search")]
		public async Task<IActionResult> Search(CardLabelSearchParam param)
		{
			var res = await _labelService.Search(param);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("addLabelOnCard")]
		public async Task<IActionResult> AddLabelOnCard(Dtos.CardLabel.AddLabelOnCard param)
		{
			var res = await _labelService.AddLabelOnCard(param.LabelId, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPost("createLabelAndAddOnCard")]
		public async Task<IActionResult> CreateLabelAndAddOnCard(Dtos.CardLabel.CreateLabelAndAddOnCard param)
		{
			var res = await _labelService.CreateLabelAndAddOnCard(param.Label, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
