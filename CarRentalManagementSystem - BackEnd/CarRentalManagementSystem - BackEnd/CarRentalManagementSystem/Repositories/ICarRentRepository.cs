using CarRentalManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public interface ICarRentRepository
    {
        Task<RentCar> AddCarRent(RentCar carRent);
        Task<Cars> GetCarById(int? carId);
        Task<Customer> GetCustomerById(int customerId);
        Task<Customer> GetCustomerByEmail(string email);
        Task<Admin> GetAdminById(int adminId);
        Task<IEnumerable<RentCar>> GetAllPendingCarRents();
        Task<IEnumerable<RentCar>> GetAllCarRents();
        Task<RentCar> GetCarRentById(int rentCarId);
        Task UpdateCarRent(RentCar carRent);
        Task UpdateCar(Cars car);
        Task<IEnumerable<RentCar>> GetCarRentsByCustomerId(int customerId);
        Task<RentCar> GetCarRentByIdAndCustomerId(int rentCarId, int customerId); // New method
    }
}