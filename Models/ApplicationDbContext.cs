using Microsoft.EntityFrameworkCore;

namespace FeastforyourBeast.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Sitter> Sitter { get; set; }
        public DbSet<Timeslot> Timeslots { get; set; }
        public DbSet<Availability> Availabilities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Design composite key for Availability table
            modelBuilder.Entity<Availability>().HasKey(a => new { a.SitterId, a.TimeslotId });
        }
    }
}
