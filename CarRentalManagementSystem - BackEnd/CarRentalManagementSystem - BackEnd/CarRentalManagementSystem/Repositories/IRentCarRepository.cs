using CarRentalManagementSystem.Models;
using System;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public interface IRentCarRepository
    {
        Task<RentCar?> GetRentCarByIdAsync(int rentCarId);
        Task AddRentCarAsync(RentCar rentCar);
        Task UpdateCarAsync(Cars car);
        Task<Cars?> GetCarByIdAsync(int carId);
    }
}