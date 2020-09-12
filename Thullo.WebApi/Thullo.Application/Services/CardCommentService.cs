using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class CardCommentService : ICardCommentService
	{
		private readonly CurrentUserAccessor _userAccessor;
		private readonly ThulloDbContext _db;

		public CardCommentService(CurrentUserAccessor cua, ThulloDbContext db)
		{
			_userAccessor = cua;
			_db = db;
		}

		public async Task<Response<int>> Create(CardComment comment)
		{
			var result = new Response<int>();

			if (string.IsNullOrWhiteSpace(comment.Text))
			{
				result.Errors.Add("Text is empty");
				return result;
			}

			comment.CreatedById = _userAccessor.CurrentUser.Id;
			comment.CreatedDate = DateTime.UtcNow;

			await _db.CardComments.AddAsync(comment);
			await _db.SaveChangesAsync();

			result.Item = comment.Id;

			return result;
		}

		public async Task<Response<bool>> Delete(int commentId)
		{
			var result = new Response<bool>();

			var comment = await _db.CardComments.AsNoTracking().FirstOrDefaultAsync(c => c.Id == commentId);

			if (comment is null)
			{
				result.Errors.Add($"Comment with id {commentId} was not found");
				return result;
			}

			_db.CardComments.Remove(comment);
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<bool>> UpdateText(string text, int commentId)
		{
			var result = new Response<bool>();

			var comment = await _db.CardComments.FirstOrDefaultAsync(c => c.Id == commentId);

			if (comment is null)
			{
				result.Errors.Add($"Comment with id {commentId} was not found");
				return result;
			}

			comment.Text = text;
			comment.UpdatedById = _userAccessor.CurrentUser.Id;
			comment.UpdatedDate = DateTime.UtcNow;
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}
	}
}
