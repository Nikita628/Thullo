namespace Thullo.Application.DbModel
{
	public class BoardMembership
	{
		public int UserId { get; set; }
		public int BoardId { get; set; }

		public User User { get; set; }
		public Board Board { get; set; }
	}
}
