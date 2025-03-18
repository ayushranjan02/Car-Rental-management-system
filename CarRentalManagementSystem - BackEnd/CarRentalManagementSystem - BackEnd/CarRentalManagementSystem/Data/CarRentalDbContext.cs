using CarRentalManagementSystem.Authentication;
using CarRentalManagementSystem.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarRentalManagementSystem.Data
{
    public class CarRentalDbContext : IdentityDbContext<ApplicationUser>
    {
        public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options) : base(options) { }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Cars> Cars { get; set; }
        public DbSet<RentCar> RentCars { get; set; }
        public DbSet<Payment> Payments { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Cars>()
                .Property(c => c.RentPrice)
                .HasColumnType("decimal(18,2)");

            // Configure the Amount column type for Payment entity
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<RentCar>()
                .Property(c=>c.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<RentCar>()
                .HasOne(u => u.Carss)
                .WithMany(i => i.RentCars)
                .HasForeignKey(u => u.CarId);

            modelBuilder.Entity<Cars>()
                .HasMany(c => c.RentCars)
                .WithOne(rc => rc.Carss)
                .HasForeignKey(rc => rc.CarId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}