using CarRentalManagementSystem.Models.DTO;
using CarRentalManagementSystem.Models;
using CarRentalManagementSystem.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace CarRentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarRentController : ControllerBase
    {
        private readonly ICarRentRepository _carRentRepository;
        private readonly ICarRepository _carRepository;
        private readonly IRentCarRepository _rentCarRepository;

        public CarRentController(ICarRentRepository carRentRepository, ICarRepository carRepository, IRentCarRepository rentCarRepository)
        {
            _carRentRepository = carRentRepository;
            _carRepository = carRepository;
            _rentCarRepository = rentCarRepository;
        }

        [Authorize(Roles = UserRoles.Customer)]
        [HttpPost]
        [Route("rent-car")]
        public async Task<IActionResult> RentCar([FromBody] RequestRentCarDTO model)
        {
            var car = await _carRepository.GetCarByIdAsync(model.CarId);
            string currentUserEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (car == null || car.Availability_Status != "Available")
            {
                return NotFound(new { Status = "Error", Message = "Car Already Rented." });
            }
            var customer = await _carRentRepository.GetCustomerByEmail(currentUserEmail);
            if (customer == null)
            {
                return NotFound((new { Status = "Error", Message = "Customer email not available." }));
            }
            // Calculate the rental amount
            var totalDays = (model.RentToDate - model.RentFromDate).Days;
            var amount = totalDays * car.RentPrice;
            var rentCar = new RentCar
            {
                CarId = model.CarId,
                CustomerId = customer.CustomerId,
                RentFromDate = model.RentFromDate,
                RentToDate = model.RentToDate,
                Amount = amount,
                RentStatus = "Pending"
            };

            await _rentCarRepository.AddRentCarAsync(rentCar);
            car.Availability_Status = "Pending";

            await _rentCarRepository.UpdateCarAsync(car);

            return Ok(new { Status = "Success", Message = "Car rental request submitted successfully!", RentCar = rentCar });
        }

        [HttpGet]
        [Route("GetAllCarRents")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCarRents()
        {
            var carRents = await _carRentRepository.GetAllCarRents();
            return Ok(carRents);
        }

        [HttpGet]
        [Route("GetCustomerCarRents/{customerId}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetCustomerCarRents(int customerId)
        {
            var currentUserEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var customer = await _carRentRepository.GetCustomerByEmail(currentUserEmail);

            if (customer == null || customer.CustomerId != customerId)
            {
                return Unauthorized(new { Status = "Error", Message = "You are not authorized to view these records." });
            }

            var carRents = await _carRentRepository.GetCarRentsByCustomerId(customerId);
            return Ok(carRents);
        }

        [Route("CancelCarRent/{rentcarid}")]
        [HttpPut]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CancelCarRent(int rentcarid)
        {
            var currentUserEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var customer = await _carRentRepository.GetCustomerByEmail(currentUserEmail);

            var carRent = await _carRentRepository.GetCarRentById(rentcarid);
            if (carRent == null || carRent.CustomerId != customer.CustomerId)
            {
                return Unauthorized(new { Status = "Error", Message = "You are not authorized to cancel this rental." });
            }

            var car = await _carRentRepository.GetCarById(carRent.CarId);
            car.Availability_Status = "Available";
            await _carRentRepository.UpdateCar(car);
            carRent.RentStatus = "Cancelled";
            await _carRentRepository.UpdateCarRent(carRent);
            return Ok(new { Status = "Success", Message = "Car rental cancelled successfully!" });
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> GetCarRentById(int id)
        {
            var carRent = await _carRentRepository.GetCarRentById(id);
            if (carRent == null)
            {
                return NotFound();
            }
            return Ok(carRent);
        }

        [Route("GetAllPendingCarRents")]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPendingCarRents()
        {
            var carRents = await _carRentRepository.GetAllPendingCarRents();
            return Ok(carRents);
        }

        [HttpGet("getpendingcarrent/{rentcarid}/{customerid}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetPendingCarRent(int rentcarid, int customerid)
        {
            var carRentObj = await _carRentRepository.GetCarRentById(rentcarid);
            if (carRentObj == null || carRentObj.CustomerId != customerid)
            {
                return NotFound();
            }

            return Ok(carRentObj);
        }

        [HttpPut("accept/{rentcarid}/{adminid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AcceptCarRent(int rentcarid, int adminid)
        {
            var carRentObj = await _carRentRepository.GetCarRentById(rentcarid);
            if (carRentObj == null)
            {
                return NotFound();
            }
            var admin = await _carRentRepository.GetAdminById(adminid);
            if (admin == null)
            {
                return BadRequest("Admin does not exist in the database.");
            }

            if (carRentObj.CarId == null)
            {
                return BadRequest("Car ID is null.");
            }

            var car = await _carRentRepository.GetCarById(carRentObj.CarId.Value);
            if (car == null)
            {
                return BadRequest("Car does not exist in the database.");
            }
            car.Availability_Status = "Rented";
            carRentObj.ApprovedBy = admin.Email;
            carRentObj.RentStatus = "Accepted";
            await _carRentRepository.UpdateCar(car);
            await _carRentRepository.UpdateCarRent(carRentObj);
            return Ok(new { Status = "Success", Message = "Car rental accepted successfully!", RentCar = carRentObj });
        }

        [HttpPut("reject/{rentcarid}/{adminid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RejectCarRent(int rentcarid, int adminid)
        {
            var carRentObj = await _carRentRepository.GetCarRentById(rentcarid);
            if (carRentObj == null)
            {
                return NotFound();
            }
            var admin = await _carRentRepository.GetAdminById(adminid);
            if (admin == null)
            {
                return BadRequest("Admin does not exist in the database.");
            }
            carRentObj.ApprovedBy = admin.Email;
            carRentObj.RentStatus = "Rejected";
            await _carRentRepository.UpdateCarRent(carRentObj);
            return Ok(new { Status = "Success", Message = "Car rental rejected successfully!", RentCar = carRentObj });
        }

        [HttpPut("return/{rentcarid}/{customerid}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> ReturnCarRent(int rentcarid, int customerid)
        {
            var time = DateTime.Now;
            if (time.Hour < 9 || time.Hour >= 20)
            {
                return BadRequest("This operation can only be done between 9am to 8pm.");
            }

            var carRentObj = await _carRentRepository.GetCarRentById(rentcarid);
            if (carRentObj == null)
            {
                return NotFound();
            }

            if (carRentObj.CustomerId != customerid)
            {
                return BadRequest("Customer ID does not match the rental record.");
            }

            carRentObj.RentStatus = "Returned";
            if (carRentObj.CarId == null)
            {
                return BadRequest("Car ID is null.");
            }

            var car = await _carRentRepository.GetCarById(carRentObj.CarId.Value);
            if (car == null)
            {
                return BadRequest("Car does not exist in the database.");
            }

            car.Availability_Status = "Available";
            await _carRentRepository.UpdateCar(car);
            await _carRentRepository.UpdateCarRent(carRentObj);

            return Ok(new { Status = "Success", Message = "Car returned successfully!", RentCar = carRentObj });
        }
    }
}