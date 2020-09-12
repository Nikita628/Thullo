using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
}
