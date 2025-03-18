using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CarRentalDbContext _dbContext;

        public CustomerRepository(CarRentalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Customer?> GetCustomerByEmailAsync(string email)
        {
            return await _dbContext.Customers.FirstOrDefaultAsync(c => c.Email == email);
        }

        public async Task AddCustomerAsync(Customer customer)
        {
            await _dbContext.Customers.AddAsync(customer);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Customer>> GetAllCustomers()
        {
            return await _dbContext.Customers.ToListAsync();
        }
        public async Task<Customer?> GetCustomerByIdAsync(Guid customerId)
        {
            return await _dbContext.Customers.FindAsync(customerId);
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            _dbContext.Customers.Update(customer);
            await _dbContext.SaveChangesAsync();
        }
    }
}