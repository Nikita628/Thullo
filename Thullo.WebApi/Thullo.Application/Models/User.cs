using Thullo.Application.Common;
using Thullo.Application.DbModel;

namespace Thullo.Application.Models
{
	public class UserSearchParam : PageRequest
	{
		public string NameOrEmailContains { get; set; }
	}

	public class UserUpdateData
	{
		public User User { get; set; }
		public FileData Img { get; set; }
	}
}
