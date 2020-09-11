using System.Collections.Generic;

namespace Thullo.Application.DbModel
{
	public class BoardList : AuditEntity
	{
		public int Id { get; set; }
		public int BoardId { get; set; }
		public string Title { get; set; }

		public Board Board { get; set; }
		public ICollection<Card> Cards { get; set; }
	}
}
