namespace Thullo.WebApi.Dtos.User
{
    public class InviteOrDeleteBoard
    {
        public int UserId { get; set; }
        public int BoardId { get; set; }
    }

    public class InviteOrDeleteCard
    {
        public int UserId { get; set; }
        public int CardId { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Dtos.Common.File Img { get; set; }
    }
}
