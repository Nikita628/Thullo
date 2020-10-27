using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
	public class BoardListService : IBoardListService
	{
		private readonly ThulloDbContext _db;

		public BoardListService(ThulloDbContext db)
		{
			_db = db;
		}

		public async Task<Response<int>> Create(BoardList boardList)
		{
			var result = new Response<int>();

			if (string.IsNullOrWhiteSpace(boardList.Title))
			{
				result.Errors.Add("Title is empty");
				return result;
			}

			if (boardList.BoardId == default)
			{
				result.Errors.Add("BoardId is empty");
				return result;
			}

			await _db.BoardLists.AddAsync(boardList);
			await _db.SaveChangesAsync();

			result.Item = boardList.Id;

			return result;
		}

		public async Task<Response<bool>> Delete(int id)
		{
			var result = new Response<bool>();

			using (var transaction = _db.Database.BeginTransaction())
			{
				try
				{
					var boardList = await _db.BoardLists
						.Include(bl => bl.Cards)
						.ThenInclude(c => c.CardAttachments)
						.ThenInclude(ca => ca.File)

						.Include(bl => bl.Cards)
						.ThenInclude(c => c.LabelToCardRelations)
						.ThenInclude(ltc => ltc.CardLabel)

						.Include(bl => bl.Cards)
						.ThenInclude(c => c.CardMemberships)

						.Include(bl => bl.Cards)
						.ThenInclude(c => c.CardComments)

						.FirstOrDefaultAsync(bl => bl.Id == id);

					_db.LabelToCardRelations.RemoveRange(boardList.Cards.SelectMany(c => c.LabelToCardRelations));

					if (boardList is null)
					{
						result.Errors.Add($"Boardlist with id {id} was not found");
						return result;
					}

					_db.BoardLists.Remove(boardList);

					await _db.SaveChangesAsync();

					result.Item = true;

					transaction.Commit();

					return result;
				}
				catch (Exception e)
				{
					await transaction.RollbackAsync();
					throw;
				}
			}
		}

		public async Task<Response<BoardList>> Get(int id)
		{
			var result = new Response<BoardList>();

			var boardList = await _db.BoardLists.FindAsync(id);

			if (boardList is null)
			{
				result.Errors.Add($"Boardlist with id {id} was not found");
				return result;
			}

			result.Item = boardList;

			return result;
		}

		public async Task<Response<bool>> UpdateTitle(string title, int id)
		{
			var result = new Response<bool>();

			var boardList = await _db.BoardLists.FindAsync(id);

			if (boardList is null)
			{
				result.Errors.Add($"Boardlist with id {id} was not found");
				return result;
			}

			boardList.Title = title;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}
	}
}
