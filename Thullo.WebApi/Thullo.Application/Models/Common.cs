namespace Thullo.Application.Models
{
    public class PexelsPhoto
    {
        public class Source
        {
            public string Original { get; set; }
            public string Small { get; set; }
            public string Tiny { get; set; }
            public string Medium { get; set; }
        }

        public string Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Url { get; set; }
        public Source Src { get; set; }
    }

    public class PexelsPhotoSearchParam
    {
        public string Query { get; set; }
        public string Locale { get; set; }
        public int Page { get; set; }
        public int PerPage { get; set; }
    }
}
