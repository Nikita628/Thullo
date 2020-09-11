using System.Collections.Generic;

namespace Thullo.Application.DbModel
{
	public class CardLabel : AuditEntity
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Color { get; set; }
		public int BoardId { get; set; }

		public Board Board { get; set; }
		public ICollection<LabelToCardRelation> LabelToCardRelations { get; set; }
	}
}
