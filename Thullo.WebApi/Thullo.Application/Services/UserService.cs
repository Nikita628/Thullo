using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Services
{
    public class UserService : IUserService
	{
		private readonly ThulloDbContext _db;
		private readonly ICloudService _cloudService;

		public UserService(ThulloDbContext db, ICloudService cs)
		{
			_db = db;
			_cloudService = cs;
		}

		public async Task<Response<bool>> DeleteFromBoard(int userId, int boardId)
		{
			var result = new Response<bool>();

			var membership = await _db.BoardMemberships.FirstOrDefaultAsync(m => m.BoardId == boardId && m.UserId == userId);
			_db.BoardMemberships.Remove(membership);
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<bool>> DeleteFromCard(int userId, int cardId)
		{
			var result = new Response<bool>();

			var membership = await _db.CardMemberships.FirstOrDefaultAsync(m => m.CardId == cardId && m.UserId == userId);
			_db.CardMemberships.Remove(membership);
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<User>> Get(int userId)
		{
			var result = new Response<User>();

			var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);

			if (user is null)
			{
				result.Errors.Add($"User with id {userId} was not found");
				return result;
			}

			result.Item = user;

			return result;
		}

		public async Task<Response<bool>> InviteToBoard(int userId, int boardId)
		{
			var result = new Response<bool>();

			var boardMembership = new BoardMembership
			{
				BoardId = boardId,
				UserId = userId
			};

			await _db.BoardMemberships.AddAsync(boardMembership);
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<Response<bool>> InviteToCard(int userId, int cardId)
		{
			var result = new Response<bool>();

			var cardMembership = new CardMembership
			{
				CardId = cardId,
				UserId = userId
			};

			await _db.CardMemberships.AddAsync(cardMembership);
			await _db.SaveChangesAsync();

			result.Item = true;

			return result;
		}

		public async Task<PageResponse<User>> Search(UserSearchParam param)
		{
			var result = new PageResponse<User>();

			var query = _db.Users.AsNoTracking();

			if (!string.IsNullOrWhiteSpace(param.NameOrEmailContains))
			{
				if (param.NameOrEmailContains.Contains(" "))
					query = query.Where(u => $"{u.FirstName} {u.LastName}".Contains(param.NameOrEmailContains));
				else
					query = query.Where(u => u.FirstName.Contains(param.NameOrEmailContains)
					|| u.LastName.Contains(param.NameOrEmailContains)
					|| u.Email.Contains(param.NameOrEmailContains));
			}

			int totalCount = await query.CountAsync();

			query = query.OrderBy(u => u.Id);

			query = query.Skip((param.PageNumber - 1) * param.PageSize)
				.Take(param.PageSize);

			var users = await query.ToListAsync();

			result.Items = users;
			result.TotalCount = totalCount;

			return result;
		}

		public async Task<Response<bool>> Update(UserUpdateData updateData)
		{
			var result = new Response<bool>();

			var existingUser = await _db.Users
				.Include(u => u.Img)
				.FirstOrDefaultAsync(u => u.Id == updateData.User.Id);

			if (existingUser is null)
			{
				result.Errors.Add($"User with id {updateData.User.Id} was not found");
				return result;
			}

			using (var transaction = _db.Database.BeginTransaction())
			{
				try
				{
					await ReplaceUserImg(existingUser, updateData.Img);

					existingUser.FirstName = updateData.User.FirstName;
					existingUser.LastName = updateData.User.LastName;

					await _db.SaveChangesAsync();

					transaction.Commit();
				}
				catch (Exception e)
				{
					await transaction.RollbackAsync();
					throw;
				}
			}

			return result;
		}

		private async Task ReplaceUserImg(User user, FileData img)
		{
			if (img != null)
			{
				var uploadTask = _cloudService.UploadAsync(img);

				if (user.Img != null)
				{
					_ = _cloudService.DeleteAsync(user.Img.StorageData);
					_db.Files.Remove(user.Img);
				}

				var uploadResult = await uploadTask;
				var file = new File
				{
					Name = img.FileName,
					Url = uploadResult.Url,
					StorageData = uploadResult.PublicId
				};

				await _db.Files.AddAsync(file);
				await _db.SaveChangesAsync();
				user.ImgId = file.Id;
			}
		}
	}
}
