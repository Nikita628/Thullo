using System.Collections.Generic;

namespace Thullo.WebApi.Dtos.Card
{
    public class UpdateDescription
    {
        public int CardId { get; set; }
        public string Description { get; set; }
    }

    public class UpdateTitle
    {
        public int CardId { get; set; }
        public string Title { get; set; }
    }

    public class MoveCardToList
    {
        public int CardId { get; set; }
        public int ListId { get; set; }
    }

    public class UpdateCoverUrl
    {
        public int CardId { get; set; }
        public string CoverUrl { get; set; }
    }

    public class Card
	{
        public int Id { get; set; }
        public string CoverUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int BoardListId { get; set; }
		public List<Dtos.User.User> Users { get; set; }
		public List<Dtos.CardLabel.CardLabel> Labels { get; set; }
	}
}
