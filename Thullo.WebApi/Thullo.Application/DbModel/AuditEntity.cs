using System;

namespace Thullo.Application.DbModel
{
	public class AuditEntity
	{
		public int CreatedById { get; set; }
		public DateTime CreatedDate { get; set; }
		public int? UpdatedById { get; set; }
		public DateTime? UpdatedDate { get; set; }

		public User CreatedBy { get; set; }
		public User UpdatedBy { get; set; }
	}
}
