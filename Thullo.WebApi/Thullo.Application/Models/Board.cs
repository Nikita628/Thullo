using System;
using System.Collections.Generic;
using System.Text;
using Thullo.Application.Common;

namespace Thullo.Application.Models
{
	public class BoardSearchParam : PageRequest
	{
		public string TitleContains { get; set; }
	}
}
