using CarRentalManagementSystem.Models;
using System;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customer?> GetCustomerByEmailAsync(string email);
        Task AddCustomerAsync(Customer customer);
        Task<IEnumerable<Customer>> GetAllCustomers();
        Task<Customer?> GetCustomerByIdAsync(Guid customerId); // Add this method
        Task UpdateCustomerAsync(Customer customer);
    }
}