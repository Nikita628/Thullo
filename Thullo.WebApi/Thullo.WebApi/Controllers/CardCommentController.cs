using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

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

		[HttpPost("create")]
		public async Task<IActionResult> Create(CardComment comment)
		{
			var res = await _commentService.Create(comment);

			var mappedRes = _mapper.Map<Response<Dtos.CardComment.CardComment>>(res);

			return Ok(mappedRes);
		}

		[HttpPut("updateText")]
		public async Task<IActionResult> UpdateText(Dtos.CardComment.UpdateText param)
		{
			var res = await _commentService.UpdateText(param.Text, param.CardCommentId);

			return Ok(res);
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> Delete([FromRoute]int id)
		{
			var res = await _commentService.Delete(id);

			return Ok(res);
		}
	}
}
