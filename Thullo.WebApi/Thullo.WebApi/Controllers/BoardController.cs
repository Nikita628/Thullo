﻿using AutoMapper;
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
	public class BoardController : ControllerBase
	{
		private readonly IBoardService _boardService;
		private readonly IMapper _mapper;

		public BoardController(IBoardService bs, IMapper m)
		{
			_boardService = bs;
			_mapper = m;
		}

		[HttpPost("search")]
		public async Task<IActionResult> Search(BoardSearchParam param)
		{
			var res = await _boardService.Search(param);

			var response = _mapper.Map<PageResponse<Dtos.Board.Board>>(res);

			return Ok(response);
		}

		[HttpPost("create")]
		public async Task<IActionResult> Create(Board board)
		{
			var res = await _boardService.Create(board);

			return Ok(res);
		}

		[HttpPut("updateVisibility")]
		public async Task<IActionResult> UpdateVisibility(Dtos.Board.UpdateVisibility param)
		{
            var res = await _boardService.UpdateVisibility(param.IsPrivate, param.BoardId);

            return Ok(res);
		}

		[HttpPut("updateTitle")]
		public async Task<IActionResult> UpdateTitle(Dtos.Board.UpdateTitle param)
		{
			var res = await _boardService.UpdateTitle(param.Title, param.BoardId);

			return Ok(res);
		}

		[HttpPut("updateDescription")]
		public async Task<IActionResult> UpdateDescription(Dtos.Board.UpdateDescription param)
		{
			var res = await _boardService.UpdateDescription(param.Description, param.BoardId);

			return Ok(res);
		}

		[HttpGet("get/{boardId}")]
		public async Task<IActionResult> Get(int boardId)
		{
			var res = await _boardService.Get(boardId);

			var response = _mapper.Map<Response<Dtos.Board.Board>>(res);

			return Ok(response);
		}
	}
}
