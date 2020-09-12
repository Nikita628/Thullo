using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
}
