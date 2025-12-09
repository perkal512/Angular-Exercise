using GaragesApi.Models;
using GaragesApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

namespace GaragesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GaragesController : ControllerBase
    {
        private readonly GarageService _service;
        private readonly IHttpClientFactory _httpClientFactory;

        public GaragesController(GarageService service, IHttpClientFactory httpClientFactory)
        {
            _service = service;
            _httpClientFactory = httpClientFactory;
        }

        // 1. שליפת מוסכים מה-API הממשלתי ושמירה במסד המקומי
        [HttpGet("external")]
        public async Task<IActionResult> GetExternalGarages()
        {
            var client = _httpClientFactory.CreateClient();
            var url = "https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5";
            var response = await client.GetFromJsonAsync<ApiResponse>(url);
            if (response == null || !response.success) return BadRequest();

            var garages = response.result.records.Select(r => new Garage
            {
                ExternalId = r._id,
                MisparMosah = r.mispar_mosah,
                Name = r.shem_mosah,
                CodSugMosah = r.cod_sug_mosah,
                SugMosah = r.sug_mosah,
                Address = r.ktovet,
                City = r.yishuv,
                Phone = r.telephone,
                Mikud = r.mikud,
                CodMiktzoa = r.cod_miktzoa,
                Profession = r.miktzoa,
                Manager = r.menahel_miktzoa,
                RashamHavarot = r.rasham_havarot,
                TestTime = r.TESTIME
            }).ToList();

            // שמירה אוטומטית במסד המקומי, רק מוסכים שלא קיימים
            var savedGarages = await _service.AddMultipleAsync(garages);

            return Ok(savedGarages);
        }

        // 2. שליפת כל המוסכים מה-DB המקומי
        [HttpGet("local")]
        public async Task<IActionResult> GetLocalGarages()
        {
            var garages = await _service.GetAllAsync();
            return Ok(garages);
        }

        // 3. הוספת מוסך יחיד
        [HttpPost("add")]
        public async Task<IActionResult> AddGarage([FromBody] Garage garage)
        {
            var added = await _service.AddGarageAsync(garage);
            if (added == null) return Conflict("Garage already exists");
            return Ok(added);
        }

        // 4. הוספת מספר מוסכים בבת אחת
        [HttpPost("add-multiple")]
        public async Task<IActionResult> AddMultiple([FromBody] List<Garage> garages)
        {
            var added = await _service.AddMultipleAsync(garages);
            return Ok(added);
        }
    }
}