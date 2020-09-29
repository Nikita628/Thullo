namespace Thullo.WebApi.Dtos.CardLabel
{
    public class AddLabelOnCard
    {
        public int LabelId { get; set; }
        public int CardId { get; set; }
    }

    public class CreateLabelAndAddOnCard
    {
        public Application.DbModel.CardLabel Label { get; set; }
        public int CardId { get; set; }
    }

    public class CardLabel
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public int BoardId { get; set; }
    }
}
