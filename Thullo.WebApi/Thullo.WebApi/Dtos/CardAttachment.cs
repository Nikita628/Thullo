using System;

namespace Thullo.WebApi.Dtos.CardAttachment
{
	public class CardAttachment
	{
		public int Id { get; set; }
		public int CardId { get; set; }
		public Dtos.Common.File File { get; set; }
        public DateTime CreatedDate { get; set; }
        public Dtos.User.User CreatedBy { get; set; }
    }
}
