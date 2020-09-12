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
	public class CardCommentController : ControllerBase
	{
		private readonly ICardCommentService _commentService;
		private readonly IMapper _mapper;

		public CardCommentController(ICardCommentService bs, IMapper m)
		{
			_commentService = bs;
			_mapper = m;
		}

		[HttpPost]
		public async Task<IActionResult> Create(CardComment comment)
		{
			var res = await _commentService.Create(comment);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("updateText")]
		public async Task<IActionResult> UpdateText(Dtos.CardComment.UpdateText param)
		{
			var res = await _commentService.UpdateText(param.Text, param.CardCommentId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> Delete([FromRoute]int id)
		{
			var res = await _commentService.Delete(id);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
