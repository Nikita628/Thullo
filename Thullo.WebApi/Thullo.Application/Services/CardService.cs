using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Thullo.Application.Common;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;

namespace Thullo.Application.Services
{
	public class CardService : ICardService
	{
		private readonly CurrentUserAccessor _userAccessor;
		private readonly ThulloDbContext _db;

		public CardService(CurrentUserAccessor cua, ThulloDbContext db)
		{
			_userAccessor = cua;
			_db = db;
		}

		public async Task<Response<int>> Create(Card card)
		{
			var result = new Response<int>();

			if (string.IsNullOrWhiteSpace(card.Title))
			{
				result.Errors.Add("Title is empty");
				return result;
			}

			card.CreatedById = _userAccessor.CurrentUser.Id;
			card.CreatedDate = DateTime.UtcNow;

			await _db.Cards.AddAsync(card);
			await _db.SaveChangesAsync();

			result.Item = card.Id;

			return result;
		}

		public async Task<Response<Card>> Get(int cardId)
		{
			var result = new Response<Card>();

			var card = await _db.Cards.AsNoTracking().FirstOrDefaultAsync(c => c.Id == cardId);

			if (card is null)
			{
				result.Errors.Add($"Card with id {cardId} was not found");
				return result;
			}

			result.Item = card;

			return result;
		}

		public async Task<Response<bool>> MoveCardToList(int cardId, int listId)
		{
			var result = new Response<bool>();

			var card = await _db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

			if (card is null)
			{
				result.Errors.Add($"Card with id {cardId} was not found");
				return result;
			}

			card.UpdatedById = _userAccessor.CurrentUser.Id;
			card.UpdatedDate = DateTime.UtcNow;
			card.BoardListId = listId;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<bool>> UpdateCoverUrl(string url, int cardId)
		{
			var result = new Response<bool>();

			var card = await _db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

			if (card is null)
			{
				result.Errors.Add($"Card with id {cardId} was not found");
				return result;
			}

			card.UpdatedById = _userAccessor.CurrentUser.Id;
			card.UpdatedDate = DateTime.UtcNow;
			card.CoverUrl = url;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<bool>> UpdateDescription(string description, int cardId)
		{
			var result = new Response<bool>();

			var card = await _db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

			if (card is null)
			{
				result.Errors.Add($"Card with id {cardId} was not found");
				return result;
			}

			card.UpdatedById = _userAccessor.CurrentUser.Id;
			card.UpdatedDate = DateTime.UtcNow;
			card.Description = description;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<bool>> UpdateTitle(string title, int cardId)
		{
			var result = new Response<bool>();

			var card = await _db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

			if (card is null)
			{
				result.Errors.Add($"Card with id {cardId} was not found");
				return result;
			}

			card.UpdatedById = _userAccessor.CurrentUser.Id;
			card.UpdatedDate = DateTime.UtcNow;
			card.Title = title;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}
	}
}
