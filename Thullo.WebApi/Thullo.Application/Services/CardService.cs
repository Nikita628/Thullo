using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
	public class CardService : ICardService
	{
		private readonly ThulloDbContext _db;

		public CardService(ThulloDbContext db)
		{
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

			await _db.Cards.AddAsync(card);
			await _db.SaveChangesAsync();

			result.Item = card.Id;

			return result;
		}

		public async Task<Response<Card>> Get(int cardId)
		{
			var result = new Response<Card>();

			var card = await _db.Cards
				.AsNoTracking()

				.Include(c => c.CardMemberships)
				.ThenInclude(cm => cm.User)
				.ThenInclude(u => u.Img)

				.Include(c => c.LabelToCardRelations)
				.ThenInclude(lcr => lcr.CardLabel)

				.Include(c => c.CardAttachments)
				.ThenInclude(ca => ca.File)

				.Include(c => c.CardAttachments)
				.ThenInclude(ca => ca.CreatedBy)

				.Include(c => c.CardComments)
				.ThenInclude(cc => cc.CreatedBy)

				.FirstOrDefaultAsync(c => c.Id == cardId);

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

			card.Title = title;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}
	}
}
