﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class CardAttachmentService : ICardAttachmentService
	{
		private readonly CurrentUserAccessor _userAccessor;
		private readonly ThulloDbContext _db;
		private readonly ICloudService _cloudService;

		public CardAttachmentService(CurrentUserAccessor cua, ThulloDbContext db, ICloudService cs)
		{
			_userAccessor = cua;
			_db = db;
			_cloudService = cs;
		}

		public async Task<Response<CardAttachment>> Create(FileData fileData, int cardId)
		{
			var result = new Response<CardAttachment>();

			using (var transaction = _db.Database.BeginTransaction())
			{
				try
				{
					var uploadResult = await _cloudService.UploadAsync(fileData);

					var file = new File
					{
						Name = fileData.FileName,
						StorageData = uploadResult.PublicId,
						Url = uploadResult.Url,
						ContentType = fileData.ContentType
					};

					await _db.Files.AddAsync(file);
					await _db.SaveChangesAsync();

					var attachment = new CardAttachment
					{
						CardId = cardId,
						FileId = file.Id,
						CreatedById = _userAccessor.CurrentUserId,
						CreatedDate = DateTime.UtcNow
					};

					await _db.CardAttachments.AddAsync(attachment);
					await _db.SaveChangesAsync();

					transaction.Commit();

					var createdAttachment = await _db.CardAttachments
						.AsNoTracking()
						.Include(a => a.CreatedBy)
						.Include(a => a.File)
						.FirstOrDefaultAsync(a => a.Id == attachment.Id);

					result.Item = createdAttachment;
				}
				catch (Exception e)
				{
					await transaction.RollbackAsync();
					throw;
				}
			}

			return result;
		}

		public async Task<Response<bool>> Delete(int attachmentId)
		{
			var result = new Response<bool>();

			var attachment = await _db.CardAttachments
				.AsNoTracking()
				.Include(a => a.File)
				.FirstOrDefaultAsync(a => a.Id == attachmentId);

			if (attachment is null)
			{
				result.Errors.Add($"Attachment with id {attachmentId} was not found");
				return result;
			}

			_ = _cloudService.DeleteAsync(attachment.File.StorageData);

			_db.CardAttachments.Remove(attachment);
			await _db.SaveChangesAsync();
			result.Item = true;

			return result;
		}
	}
}
