using System;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class BoardListService : IBoardListService
	{
		private readonly CurrentUserAccessor _userAccessor;
		private readonly ThulloDbContext _db;

		public BoardListService(CurrentUserAccessor cua, ThulloDbContext db)
		{
			_userAccessor = cua;
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

			boardList.CreatedById = _userAccessor.CurrentUser.Id;
			boardList.CreatedDate = DateTime.UtcNow;

			await _db.BoardLists.AddAsync(boardList);
			await _db.SaveChangesAsync();

			result.Item = boardList.Id;

			return result;
		}

		public async Task<Response<bool>> Delete(int id)
		{
			var result = new Response<bool>();

			var boardList = await _db.BoardLists.FindAsync(id);

			if (boardList is null)
			{
				result.Errors.Add($"Boardlist with id {id} was not found");
				return result;
			}

			// TODO delete all related data, eg. cards

			_db.BoardLists.Remove(boardList);

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
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

			boardList.UpdatedById = _userAccessor.CurrentUser.Id;
			boardList.UpdatedDate = DateTime.UtcNow;
			boardList.Title = title;

			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}
	}
}
