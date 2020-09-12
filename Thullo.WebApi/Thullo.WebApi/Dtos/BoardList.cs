using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thullo.WebApi.Dtos.BoardList
{
    public class UpdateTitle
    {
        public int BoardListId { get; set; }
        public string Title { get; set; }
    }
}
