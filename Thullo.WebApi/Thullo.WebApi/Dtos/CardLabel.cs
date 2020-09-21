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
}
