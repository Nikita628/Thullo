using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
}
