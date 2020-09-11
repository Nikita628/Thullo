using Thullo.Application.Common;

namespace Thullo.Application.Models
{
	public class CardLabelSearchParam : PageRequest
	{
		public string NameContains { get; set; }
		public int? BoardIdEquals { get; set; }
	}
}
