using Microsoft.EntityFrameworkCore;
using ToDo.Server.AppDb.Entity;

namespace ToDo.Server.AppDb
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TaskEntity> Task { get; set; }
    }
}
