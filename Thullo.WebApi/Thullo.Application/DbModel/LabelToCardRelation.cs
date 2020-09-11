namespace Thullo.Application.DbModel
{
	public class LabelToCardRelation
	{
		public int CardLabelId { get; set; }
		public int CardId { get; set; }

		public CardLabel CardLabel { get; set; }
		public Card Card { get; set; }
	}
}
