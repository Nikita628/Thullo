namespace Thullo.Application.DbModel
{
	public class CardAttachment : AuditEntity
	{
		public int Id { get; set; }
		public int CardId { get; set; }
		public int FileId { get; set; }

		public File File { get; set; }
		public Card Card { get; set; }
	}
}
