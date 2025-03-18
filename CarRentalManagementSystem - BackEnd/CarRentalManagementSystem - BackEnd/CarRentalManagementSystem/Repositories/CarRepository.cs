using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly CarRentalDbContext _dbContext;

        public CarRepository(CarRentalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Cars>> GetCarsAsync()
        {
            return await _dbContext.Cars.ToListAsync();
        }

        public async Task<Cars?> GetCarByIdAsync(int carId)
        {
            return await _dbContext.Cars.FindAsync(carId);
        }

        public async Task AddCarAsync(Cars car)
        {
            await _dbContext.Cars.AddAsync(car);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCarAsync(Cars car)
        {
            _dbContext.Cars.Update(car);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteCarAsync(Cars car)
        {
            var rentCars = _dbContext.RentCars.Where(rc => rc.CarId == car.CarId);
            
            if (!rentCars.Any())
            {
                _dbContext.Cars.Remove(car);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Cannot delete car as there are related rental records.");
            }
        }

        public async Task<IEnumerable<Cars>> GetRentedCarsAsync()
        {
            return await _dbContext.Cars.Where(c => c.Availability_Status == "Rented").ToListAsync();
        }

        public async Task<IEnumerable<Cars>> GetAvailableCarsAsync()
        {
            return await _dbContext.Cars.Where(c => c.Availability_Status == "Available").ToListAsync();
        }

		public async Task<IEnumerable<Cars>> GetCarsAsync(int? seater = null, string? fuelType = null, string? model = null, string? sortBy = null)
		{
			var query = _dbContext.Cars.AsQueryable();

			if (seater.HasValue)
			{
				query = query.Where(c => c.Seater == seater.Value);
			}
			if (!string.IsNullOrEmpty(fuelType))
			{
				query = query.Where(c => c.FuelType.ToLower() == fuelType.ToLower());
			}
			if (!string.IsNullOrEmpty(model))
			{
				query = query.Where(c => c.Model.ToLower() == model.ToLower());
			}

			if (!string.IsNullOrEmpty(sortBy))
			{
				switch (sortBy.ToLower())
				{
					case "name":
						query = query.OrderBy(c => c.CarName);
						break;
					case "price":
						query = query.OrderBy(c => c.RentPrice);
						break;
						// Add other sorting options as needed
				}
			}

			return await query.ToListAsync();
		}
	}
}