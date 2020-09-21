namespace Thullo.WebApi.Dtos.BoardList
{
    public class UpdateTitle
    {
        public int BoardListId { get; set; }
        public string Title { get; set; }
    }

    public class BoardList
    {
        public int Id { get; set; }
        public int BoardId { get; set; }
        public string Title { get; set; }
    }
}
