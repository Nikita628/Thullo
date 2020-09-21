using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Thullo.Application.DbModel
{
	public class User : IdentityUser<int>
	{
		public int? ImgId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public File Img { get; set; }
		public ICollection<BoardMembership> BoardMemberships { get; set; }
		public ICollection<CardMembership> CardMemberships { get; set; }
		public ICollection<Board> Boards { get; set; }
		public ICollection<BoardList> BoardLists { get; set; }
		public ICollection<CardComment> CardComments { get; set; }
		public ICollection<CardAttachment> CardAttachments { get; set; }
		public ICollection<Card> Cards { get; set; }
		public ICollection<CardLabel> CardLabels { get; set; }
	}
}
