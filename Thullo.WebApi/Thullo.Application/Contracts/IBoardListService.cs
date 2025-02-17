﻿using System.Threading.Tasks;
using Thullo.Application.DbModel;
using Thullo.Application.Models;

namespace Thullo.Application.Contracts
{
    public interface IBoardListService
	{
		Task<Response<int>> Create(BoardList boardList);
		Task<Response<bool>> UpdateTitle(string title, int id);
		Task<Response<bool>> Delete(int id);
		Task<Response<BoardList>> Get(int id);
	}
}
