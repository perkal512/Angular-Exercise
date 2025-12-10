namespace GaragesApi.Models
{
    public class ApiResponse
    {
        public bool success { get; set; }
        public Result result { get; set; } = new Result();
    }

    public class Result
    {
        public List<Record> records { get; set; } = new List<Record>();
    }

    public class Record
    {
        public int _id { get; set; }
        public int mispar_mosah { get; set; }
        public string shem_mosah { get; set; } = string.Empty;
        public int cod_sug_mosah { get; set; }
        public string sug_mosah { get; set; } = string.Empty;
        public string ktovet { get; set; } = string.Empty;
        public string yishuv { get; set; } = string.Empty;
        public string telephone { get; set; } = string.Empty;
        public int mikud { get; set; }
        public int cod_miktzoa { get; set; }
        public string miktzoa { get; set; } = string.Empty;
        public string menahel_miktzoa { get; set; } = string.Empty;
        public long rasham_havarot { get; set; }
        public string TESTIME { get; set; } = string.Empty;
    }
}