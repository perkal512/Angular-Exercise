using GaragesApi.Data;
using GaragesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GaragesApi.Services
{
    public class GarageService
    {
        private readonly AppDbContext _context;

        public GarageService(AppDbContext context)
        {
            _context = context;
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

        public async Task<List<Garage>> AddMultipleAsync(List<Garage> garages)
        {
            var toAdd = new List<Garage>();

            foreach (var g in garages)
            {
                var exists = await _context.Garages.AnyAsync(x => x.ExternalId == g.ExternalId);
                if (!exists) toAdd.Add(g);
            }

            if (toAdd.Count > 0)
            {
                _context.Garages.AddRange(toAdd);
                await _context.SaveChangesAsync();
            }

            return toAdd;
        }
    }
}