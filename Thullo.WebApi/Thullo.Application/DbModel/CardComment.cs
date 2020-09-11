namespace Thullo.Application.DbModel
{
	public class CardComment : AuditEntity
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public int CardId { get; set; }

		public Card Card { get; set; }
	}
}
