using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
	public class CardLabelService : ICardLabelService
	{
		private readonly ThulloDbContext _db;

		public CardLabelService(ThulloDbContext db)
		{
			_db = db;
		}

		public async Task<Response<bool>> AddLabelOnCard(int labelId, int cardId)
		{
			var result = new Response<bool>();

			var relation = new LabelToCardRelation
			{
				CardLabelId = labelId,
				CardId = cardId
			};

			await _db.LabelToCardRelations.AddAsync(relation);
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<int>> CreateLabelAndAddOnCard(CardLabel label, int cardId)
		{
			var result = new Response<int>();

			if (string.IsNullOrWhiteSpace(label.Name))
			{
				result.Errors.Add("Name is empty");
				return result;
			}

			if (string.IsNullOrWhiteSpace(label.Color))
			{
				result.Errors.Add("Color is empty");
				return result;
			}

			await _db.CardLabels.AddAsync(label);
			await _db.SaveChangesAsync();

			await AddLabelOnCard(label.Id, cardId);

			result.Item = label.Id;

			return result;
		}

		public async Task<PageResponse<CardLabel>> Search(CardLabelSearchParam param)
		{
			var result = new PageResponse<CardLabel>();

			var query = _db.CardLabels.AsNoTracking();

			if (!string.IsNullOrWhiteSpace(param.NameContains))
				query = query.Where(cl => cl.Name.Contains(param.NameContains, StringComparison.InvariantCultureIgnoreCase));
			if (param.BoardIdEquals.HasValue)
				query = query.Where(cl => cl.BoardId == param.BoardIdEquals.Value);
			
			int totalCount = await query.CountAsync();

			query = query.OrderBy(cl => cl.Id);

			query = query.Skip((param.PageNumber - 1) * param.PageSize)
				.Take(param.PageSize);

			var labels = await query.ToListAsync();

			result.Items = labels;
			result.TotalCount = totalCount;

			return result;
		}
	}
}
