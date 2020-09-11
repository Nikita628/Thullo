using System.Collections.Generic;

namespace Thullo.Application.DbModel
{
	public class Card : AuditEntity
	{
		public int Id { get; set; }
		public string CoverUrl { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int BoardListId { get; set; }

		public BoardList BoardList { get; set; }
		public ICollection<CardAttachment> CardAttachments { get; set; }
		public ICollection<CardComment> CardComments { get; set; }
		public ICollection<LabelToCardRelation> LabelToCardRelations { get; set; }
		public ICollection<CardMembership> CardMemberships { get; set; }
	}
}
