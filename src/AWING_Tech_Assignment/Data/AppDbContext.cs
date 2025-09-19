using AWING_Tech_Assignment.Domain;
using Microsoft.EntityFrameworkCore;

namespace AWING_Tech_Assignment.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TreasureMap> TreasureMaps { get; set; }
}