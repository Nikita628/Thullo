using System;

namespace Thullo.WebApi.Dtos.CardComment
{
    public class UpdateText
    {
        public int CardCommentId { get; set; }
        public string Text { get; set; }
    }

    public class CardComment
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public int CardId { get; set; }
		public Dtos.User.User CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
	}
}
