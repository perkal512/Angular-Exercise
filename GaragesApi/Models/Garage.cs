using System.ComponentModel.DataAnnotations;

namespace GaragesApi.Models
{
    public class Garage
    {
        [Key]
        public int GarageId { get; set; }

        [Required]
        public int ExternalId { get; set; }

        public int MisparMosah { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CodSugMosah { get; set; }
        public string SugMosah { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Phone { get; set; }
        public int Mikud { get; set; }
        public int CodMiktzoa { get; set; }
        public string? Profession { get; set; }
        public string? Manager { get; set; }
        public long RashamHavarot { get; set; }
        public string? TestTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
