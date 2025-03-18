using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public class RentCarRepository : IRentCarRepository
    {
        private readonly CarRentalDbContext _dbContext;

        public RentCarRepository(CarRentalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RentCar?> GetRentCarByIdAsync(int rentCarId)
        {
            return await _dbContext.RentCars.FindAsync(rentCarId);
        }

        public async Task AddRentCarAsync(RentCar rentCar)
        {
            await _dbContext.RentCars.AddAsync(rentCar);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCarAsync(Cars car)
        {
            _dbContext.Cars.Update(car);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Cars?> GetCarByIdAsync(int carId)
        {
            return await _dbContext.Cars.FindAsync(carId);
        }
    }
}