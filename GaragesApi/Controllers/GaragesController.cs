using GaragesApi.Models;
using GaragesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GaragesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GaragesController : ControllerBase
    {
        private readonly GarageService _service;

        public GaragesController(GarageService service)
        {
            _service = service;
        }

        [HttpPost("government-to-db")]
        public async Task<IActionResult> SyncFromGovernment()
        {
            try
            {
                var addedGarages = await _service.SyncFromGovernmentAsync();
                return Ok(addedGarages);
            }
            catch
            {
                return StatusCode(500, "Failed to sync garages from government API");
            }
        }

        [HttpGet("all-government")]
        public async Task<IActionResult> GetAllFromGovernment()
        {
            try
            {
                var garages = await _service.GetAllFromGovernmentAsync();
                return Ok(garages);
            }
            catch
            {
                return StatusCode(500, "Failed to fetch garages from government API");
            }
        }

        [HttpGet("all-local")]
        public async Task<IActionResult> GetLocalGarages()
        {
            try
            {
                var garages = await _service.GetAllAsync();
                return Ok(garages);
            }
            catch
            {
                return StatusCode(500, "Failed to fetch local garages");
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddGarage([FromBody] Garage garage)
        {
            try
            {
                var added = await _service.AddGarageAsync(garage);
                if (added == null) return Conflict("Garage already exists");
                return Ok(added);
            }
            catch
            {
                return StatusCode(500, "Failed to add garage");
            }
        }

        [HttpPost("add-multiple")]
        public async Task<IActionResult> AddMultiple([FromBody] List<Garage> garages)
        {
            try
            {
                var added = await _service.AddMultipleAsync(garages);
                if (added.Count == 0) return Conflict("All garage already exists");
                return Ok(added);
            }
            catch
            {
                return StatusCode(500, "Failed to add multiple garages");
            }
        }
    }
}

