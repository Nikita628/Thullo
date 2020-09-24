﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;
using Thullo.WebApi.Extensions;

namespace Thullo.WebApi.Controllers
{
    [Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly IMapper _mapper;

		public UserController(IUserService bs, IMapper m)
		{
			_userService = bs;
			_mapper = m;
		}

		[HttpGet("get/{userId}")]
		public async Task<IActionResult> Get(int userId)
		{
			var res = await _userService.Get(userId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPost("search")]
		public async Task<IActionResult> Search(UserSearchParam param)
		{
			var res = await _userService.Search(param);

			var response = new PageResponse<Dtos.User.User>
			{
				Errors = res.Errors,
				Items = _mapper.Map<List<Dtos.User.User>>(res.Items),
				TotalCount = res.TotalCount
			};

			if (response.Errors.Any())
				return BadRequest(res);

			return Ok(response);
		}

		[HttpPut("update")]
		public async Task<IActionResult> Update([FromForm]IFormFile userImg, [FromForm]string userDataJson)
		{
			var updData = new UserUpdateData
			{
				User = JsonConvert.DeserializeObject<User>(userDataJson),
				Img = new FileData
				{
					FileName = userImg.FileName,
					Bytes = await userImg.ToByteArrayAsync()
				}
			};

			var res = await _userService.Update(updData);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("inviteToBoard")]
		public async Task<IActionResult> InviteToBoard(Dtos.User.InviteOrDeleteBoard param)
		{
			var res = await _userService.InviteToBoard(param.UserId, param.BoardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpPut("inviteToCard")]
		public async Task<IActionResult> InviteToCard(Dtos.User.InviteOrDeleteCard param)
		{
			var res = await _userService.InviteToCard(param.UserId, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpDelete("deleteFromBoard")]
		public async Task<IActionResult> DeleteFromBoard(Dtos.User.InviteOrDeleteBoard param)
		{
			var res = await _userService.DeleteFromBoard(param.UserId, param.BoardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}

		[HttpDelete("deleteFromCard")]
		public async Task<IActionResult> DeleteFromCard(Dtos.User.InviteOrDeleteCard param)
		{
			var res = await _userService.DeleteFromCard(param.UserId, param.CardId);

			if (res.Errors.Any())
				return BadRequest(res);

			return Ok(res);
		}
	}
}
