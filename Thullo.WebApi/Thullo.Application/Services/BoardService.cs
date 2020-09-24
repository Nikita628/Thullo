using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class BoardService : IBoardService
    {
        private readonly CurrentUserAccessor _userAccessor;
        private readonly ThulloDbContext _db;

        public BoardService(CurrentUserAccessor cua, ThulloDbContext db)
        {
            _userAccessor = cua;
            _db = db;
        }

        public async Task<Response<int>> Create(Board board)
        {
            var result = new Response<int>();

            if (string.IsNullOrWhiteSpace(board.Title))
                result.Errors.Add("Title is empty");

            if (string.IsNullOrWhiteSpace(board.CoverUrl))
                result.Errors.Add("CoverUrl is empty");

            if (result.Errors.Any()) return result;

            await _db.Boards.AddAsync(board);
            await _db.SaveChangesAsync();

            result.Item = board.Id;

            return result;
        }

        public async Task<Response<Board>> Get(int boardId)
        {
            var result = new Response<Board>();

            var board = await _db.Boards.AsNoTracking()
                .Include(b => b.BoardLists)
                .ThenInclude(bl => bl.Cards)
                .FirstOrDefaultAsync(b => b.Id == boardId);

            if (board is null)
            {
                result.Errors.Add($"Board with id {boardId} was not found");
                return result;
            }

            result.Item = board;

            return result;
        }

        public async Task<PageResponse<Board>> Search(BoardSearchParam param)
        {
            var result = new PageResponse<Board>();

            var query = _db.Boards.AsNoTracking();

            if (!string.IsNullOrEmpty(param.TitleContains))
                query = query.Where(b => b.Title.Contains(param.TitleContains));

            int totalCount = await query.CountAsync();

            query = query.OrderBy(b => b.Id);

            query = query.Skip((param.PageNumber - 1) * param.PageSize)
                .Take(param.PageSize);

            // query = query.Include(b => b.BoardLists);
            query = query.Include(b => b.BoardMemberships)
                .ThenInclude(bm => bm.User)
                .ThenInclude(u => u.Img);

            var boards = await query.ToListAsync();

            result.Items = boards;
            result.TotalCount = totalCount;

            return result;
        }

        public async Task<Response<bool>> UpdateDescription(string description, int boardId)
        {
            var result = new Response<bool>();

            var board = await _db.Boards.FirstOrDefaultAsync(b => b.Id == boardId);

            if (board is null)
            {
                result.Errors.Add($"Board with id {boardId} was not found");
                return result;
            }

            board.Description = description;

            await _db.SaveChangesAsync();

            result.Item = true;

            return result;
        }

        public async Task<Response<bool>> UpdateTitle(string title, int boardId)
        {
            var result = new Response<bool>();

            var board = await _db.Boards.FirstOrDefaultAsync(b => b.Id == boardId);

            if (board is null)
            {
                result.Errors.Add($"Board with id {boardId} was not found");
                return result;
            }

            board.Title = title;

            await _db.SaveChangesAsync();

            result.Item = true;

            return result;
        }

        public async Task<Response<bool>> UpdateVisibility(bool isPrivate, int boardId)
        {
            var result = new Response<bool>();

            var board = await _db.Boards.FirstOrDefaultAsync(b => b.Id == boardId);

            if (board is null)
            {
                result.Errors.Add($"Board with id {boardId} was not found");
                return result;
            }

            board.IsPrivate = isPrivate;

            await _db.SaveChangesAsync();

            result.Item = true;

            return result;
        }
    }
}
