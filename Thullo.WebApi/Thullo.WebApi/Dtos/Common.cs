﻿namespace Thullo.WebApi.Dtos.Common
{
    public class File
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
		public string StorageData { get; set; }
		public string ContentType { get; set; }
	}
}
