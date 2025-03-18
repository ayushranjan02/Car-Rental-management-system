using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public class CarRentRepository : ICarRentRepository
    {
        private readonly CarRentalDbContext _context;

        public CarRentRepository(CarRentalDbContext context)
        {
            _context = context;
        }

        public async Task<RentCar> AddCarRent(RentCar carRent)
        {
            _context.RentCars.Add(carRent);
            await _context.SaveChangesAsync();
            return carRent;
        }

        public async Task<Cars> GetCarById(int? carId)
        {
            return await _context.Cars.FindAsync(carId);
        }

        public async Task<Customer> GetCustomerById(int customerId)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        public async Task<Customer> GetCustomerByEmail(string email)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
        }

        public async Task<Admin> GetAdminById(int adminId)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.AdminId == adminId);
        }

        public async Task<IEnumerable<RentCar>> GetAllPendingCarRents()
        {
            return await _context.RentCars
                .Include(rc => rc.Carss)
                .Include(rc => rc.Customers)
                .Where(rc => rc.RentStatus == "Pending")
                .ToListAsync();
        }

        public async Task<IEnumerable<RentCar>> GetAllCarRents()
        {
            return await _context.RentCars.ToListAsync();
        }

        public async Task<RentCar> GetCarRentById(int rentCarId)
        {
            return await _context.RentCars.FirstOrDefaultAsync(c => c.RentCarId == rentCarId);
        }

        public async Task UpdateCarRent(RentCar carRent)
        {
            _context.RentCars.Update(carRent);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCar(Cars car)
        {
            _context.Cars.Update(car);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RentCar>> GetCarRentsByCustomerId(int customerId)
        {
            return await _context.RentCars
                .Where(rc => rc.CustomerId == customerId)
                .ToListAsync();
        }

        public async Task<RentCar> GetCarRentByIdAndCustomerId(int rentCarId, int customerId)
        {
            return await _context.RentCars
                .FirstOrDefaultAsync(rc => rc.RentCarId == rentCarId && rc.CustomerId == customerId);
        }
    }
}