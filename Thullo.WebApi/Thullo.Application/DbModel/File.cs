namespace Thullo.Application.DbModel
{
	public class File
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Url { get; set; }
		public string StorageData { get; set; }

		public User User { get; set; }
		public CardAttachment CardAttachment { get; set; }
	}
}
