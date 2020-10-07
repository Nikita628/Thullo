using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

		[HttpPost("create")]
		public async Task<IActionResult> Create(BoardList boardList)
		{
			var res = await _listService.Create(boardList);

			return Ok(res);
		}

		[HttpPut("updateTitle")]
		public async Task<IActionResult> UpdateTitle(Dtos.BoardList.UpdateTitle param)
		{
			var res = await _listService.UpdateTitle(param.Title, param.BoardListId);

			return Ok(res);
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> Delete([FromRoute]int id)
		{
			var res = await _listService.Delete(id);

			return Ok(res);
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> Get([FromRoute]int id)
		{
			var res = await _listService.Get(id);

			return Ok(res);
		}
	}
}
