using GaragesApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GaragesApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Garage> Garages { get; set; }
    }
}