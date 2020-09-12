using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.WebApi.Controllers
{
    [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class BoardController : ControllerBase
	{
		private readonly IBoardService _boardService;
		private readonly IMapper _mapper;

		public BoardController(IBoardService bs, IMapper m)
		{
			_boardService = bs;
			_mapper = m;
		}

		[HttpPost]
		public async Task<IActionResult> Search(BoardSearchParam param)
		{
			var res = await _boardService.Search(param);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPost]
		public async Task<IActionResult> Create(Board board)
		{
			var res = await _boardService.Create(board);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("{boardId}")]
		public async Task<IActionResult> UpdateVisibility(int boardId, bool isPrivate)
		{
			var res = await _boardService.UpdateVisibility(isPrivate, boardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("{boardId}")]
		public async Task<IActionResult> UpdateTitle(int boardId, string title)
		{
			var res = await _boardService.UpdateTitle(title, boardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("{boardId}")]
		public async Task<IActionResult> UpdateDescription(int boardId, string description)
		{
			var res = await _boardService.UpdateDescription(description, boardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpGet("{boardId}")]
		public async Task<IActionResult> Get(int boardId)
		{
			var res = await _boardService.Get(boardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
