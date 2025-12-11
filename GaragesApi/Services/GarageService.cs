using GaragesApi.Data;
using GaragesApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Json;

namespace GaragesApi.Services
{
    public class GarageService
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public GarageService(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<List<Garage>> GetAllAsync()
        {
            return await _context.Garages.ToListAsync();
        }

        public async Task<Garage?> AddGarageAsync(Garage garage)
        {
            var exists = await _context.Garages.AnyAsync(g => g.ExternalId == garage.ExternalId);
            if (exists) return null;

            _context.Garages.Add(garage);
            await _context.SaveChangesAsync();
            return garage;
        }

        public async Task<(List<Garage> added, List<string> notAdded)> AddMultipleAsync(List<Garage> garages)
        {
            var toAdd = new List<Garage>();
            var notAdded = new List<string>();

            foreach (var g in garages)
            {
                var exists = await _context.Garages.AnyAsync(x => x.ExternalId == g.ExternalId);
                if (!exists)
                    toAdd.Add(g);
                else
                    notAdded.Add(g.Name);
            }

            if (toAdd.Count > 0)
            {
                _context.Garages.AddRange(toAdd);
                await _context.SaveChangesAsync();
            }

            return (toAdd, notAdded);
        }

        public async Task<List<Garage>> SyncFromGovernmentAsync()
        {
            var garagesFromGov = await FetchGaragesFromGovernmentAsync();
            var (added, notAdded) = await AddMultipleAsync(garagesFromGov);
            return added;
        }

        public async Task<List<Garage>> GetAllFromGovernmentAsync()
        {
            return await FetchGaragesFromGovernmentAsync();
        }

        private async Task<List<Garage>> FetchGaragesFromGovernmentAsync()
        {
            var client = _httpClientFactory.CreateClient();
            var url = "https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5";

            try
            {
                var response = await client.GetFromJsonAsync<ApiResponse>(url);
                if (response == null || !response.success) return new List<Garage>();

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

                return garages;
            }
            catch
            {
                return new List<Garage>();
            }
        }
    }
}