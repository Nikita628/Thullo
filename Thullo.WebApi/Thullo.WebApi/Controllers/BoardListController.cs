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

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateTitle(string title, int id)
		{
			var res = await _listService.UpdateTitle(title, id);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var res = await _listService.Delete(id);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var res = await _listService.Get(id);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
