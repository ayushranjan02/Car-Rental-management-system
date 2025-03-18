using CarRentalManagementSystem.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly CarRentalDbContext _dbContext;

        
        public DashboardController(CarRentalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        
        [HttpGet("totalcars")]
        public async Task<IActionResult> GetTotalCars()
        {
            var totalCars = await _dbContext.Cars.CountAsync();
            return Ok(totalCars);
        }

        
        [HttpGet("totalcustomers")]
        public async Task<IActionResult> GetTotalCustomers()
        {
            var totalCustomers = await _dbContext.Customers.CountAsync();
            return Ok(totalCustomers);
        }

       
        [HttpGet("totalAdmins")]
        public async Task<IActionResult> GetTotalAdmin()
        {
            var totalAdmin = await _dbContext.Admins.CountAsync();
            return Ok(totalAdmin);
        }

        
        [HttpGet("totalrents")]
        public async Task<IActionResult> GetTotalRents()
        {
            var totalRents = await _dbContext.RentCars.CountAsync();
            return Ok(totalRents);
        }

        
        [HttpGet("pendingrents")]
        public async Task<IActionResult> GetPendingRents()
        {
            var pendingRents = await _dbContext.RentCars.Where(r => r.RentStatus == "Pending").CountAsync();
            return Ok(pendingRents);
        }

        
        [HttpGet("paidrents")]
        public async Task<IActionResult> GetPaidRents()
        {
            var paidRents = await _dbContext.RentCars.Where(r => r.RentStatus == "Paid").CountAsync();
            return Ok(paidRents);
        }
    }
}