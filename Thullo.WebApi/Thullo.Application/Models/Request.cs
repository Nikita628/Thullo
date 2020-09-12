using Thullo.Application.Common;

namespace Thullo.Application.Models
{
	public class PageRequest
	{
		public int PageNumber { get; set; } = 1;
		public int PageSize { get; set; } = 20;
		public string SortProp { get; set; } = Constants.DefaultSortProp;
		public string SortDirection { get; set; } = Constants.AscSort;
	}
}
