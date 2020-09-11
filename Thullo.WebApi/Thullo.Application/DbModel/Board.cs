using System.Collections.Generic;

namespace Thullo.Application.DbModel
{
	public class Board : AuditEntity
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string CoverUrl { get; set; }
		public bool IsPrivate { get; set; }
		public string Description { get; set; }

		public ICollection<BoardList> BoardLists { get; set; }
		public ICollection<BoardMembership> BoardMemberships { get; set; }
	}
}
