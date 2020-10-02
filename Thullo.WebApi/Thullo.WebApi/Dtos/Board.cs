using System;
using System.Collections.Generic;

namespace Thullo.WebApi.Dtos.Board
{
    public class UpdateVisibility
    {
        public int BoardId { get; set; }
        public bool IsPrivate { get; set; }
    }

    public class UpdateTitle
    {
        public int BoardId { get; set; }
        public string Title { get; set; }
    }

    public class UpdateDescription
    {
        public int BoardId { get; set; }
        public string Description { get; set; }
    }

    public class Board
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CoverUrl { get; set; }
        public bool IsPrivate { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public Dtos.User.User CreatedBy { get; set; }
        public List<Dtos.BoardList.BoardList> BoardLists { get; set; }
        public List<Dtos.User.User> Users { get; set; }
    }
}
