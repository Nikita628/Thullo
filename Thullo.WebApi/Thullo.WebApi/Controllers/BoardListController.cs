﻿using AutoMapper;
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
	public class BoardListController : ControllerBase
	{
		private readonly IBoardListService _listService;
		private readonly IMapper _mapper;

		public BoardListController(IBoardListService bs, IMapper m)
		{
			_listService = bs;
			_mapper = m;
		}

		[HttpPost]
		public async Task<IActionResult> Create(BoardList boardList)
		{
			var res = await _listService.Create(boardList);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("updateTitle")]
		public async Task<IActionResult> UpdateTitle(Dtos.BoardList.UpdateTitle param)
		{
			var res = await _listService.UpdateTitle(param.Title, param.BoardListId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var res = await _listService.Delete(id);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var res = await _listService.Get(id);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
