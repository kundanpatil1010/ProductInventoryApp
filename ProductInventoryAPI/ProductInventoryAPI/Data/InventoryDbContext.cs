using Microsoft.EntityFrameworkCore;
using ProductInventoryAPI.Models;

namespace ProductInventoryAPI.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
