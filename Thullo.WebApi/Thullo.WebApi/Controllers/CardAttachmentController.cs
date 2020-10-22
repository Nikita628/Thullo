using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.Models;
using Thullo.WebApi.Extensions;

namespace Thullo.WebApi.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class CardAttachmentController : ControllerBase
	{
		private readonly ICardAttachmentService _attachmentService;
		private readonly IMapper _mapper;

		public CardAttachmentController(ICardAttachmentService bs, IMapper m)
		{
			_attachmentService = bs;
			_mapper = m;
		}

		[HttpPost("create")]
		public async Task<IActionResult> Create([FromForm] IFormFile attachment, [FromForm]int cardId)
		{
			var file = new FileData
			{
				FileName = attachment.FileName,
				Bytes = await attachment.ToByteArrayAsync(),
				ContentType = attachment.ContentType,
			};

			var res = await _attachmentService.Create(file, cardId);

			var mappedRes = _mapper.Map<Response<Dtos.CardAttachment.CardAttachment>>(res);

			return Ok(mappedRes);
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var res = await _attachmentService.Delete(id);

			return Ok(res);
		}
	}
}
