using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;

namespace Thullo.WebApi.Controllers
{
    [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class CardController : ControllerBase
	{
		private readonly ICardService _cardService;
		private readonly IMapper _mapper;

		public CardController(ICardService bs, IMapper m)
		{
			_cardService = bs;
			_mapper = m;
		}

		[HttpGet("get/{cardId}")]
		public async Task<IActionResult> Get(int cardId)
		{
			var res = await _cardService.Get(cardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPost("create")]
		public async Task<IActionResult> Create(Card card)
		{
			var res = await _cardService.Create(card);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("updateDescription")]
		public async Task<IActionResult> UpdateDescription(Dtos.Card.UpdateDescription param)
		{
			var res = await _cardService.UpdateDescription(param.Description, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("updateTitle")]
		public async Task<IActionResult> UpdateTitle(Dtos.Card.UpdateTitle param)
		{
			var res = await _cardService.UpdateTitle(param.Title, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("updateCoverUrl")]
		public async Task<IActionResult> UpdateCoverUrl(Dtos.Card.UpdateCoverUrl param)
		{
			var res = await _cardService.UpdateCoverUrl(param.CoverUrl, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("moveCardToList")]
		public async Task<IActionResult> MoveCardToList(Dtos.Card.MoveCardToList param)
		{
			var res = await _cardService.MoveCardToList(param.CardId, param.ListId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
