﻿namespace Thullo.Application.DbModel
{
	public class CardMembership
	{
		public int CardId { get; set; }
		public int UserId { get; set; }

		public Card Card { get; set; }
		public User User { get; set; }
	}
}
