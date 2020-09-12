using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thullo.WebApi.Dtos.CardComment
{
    public class UpdateText
    {
        public int CardCommentId { get; set; }
        public string Text { get; set; }
    }
}
