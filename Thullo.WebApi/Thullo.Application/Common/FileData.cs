namespace Thullo.Application.Common
{
	public class FileData
	{
		public byte[] Bytes { get; set; }
		public string FileName { get; set; }
	}

	public class CloudUploadResult
	{
		public string Url { get; set; }
		public string PublicId { get; set; }
	}
}
