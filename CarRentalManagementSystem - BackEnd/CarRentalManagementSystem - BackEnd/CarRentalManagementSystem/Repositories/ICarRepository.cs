using CarRentalManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public interface ICarRepository
    {
        Task<IEnumerable<Cars>> GetCarsAsync();
        Task<Cars?> GetCarByIdAsync(int carId);
        Task AddCarAsync(Cars car);
        Task UpdateCarAsync(Cars car);
        Task DeleteCarAsync(Cars car);
        Task<IEnumerable<Cars>> GetRentedCarsAsync();
        Task<IEnumerable<Cars>> GetAvailableCarsAsync();
		Task<IEnumerable<Cars>> GetCarsAsync(
			int? seater = null,
			string? fuelType = null,
			string? transmission = null,
			string? sortBy = null);
	}
}