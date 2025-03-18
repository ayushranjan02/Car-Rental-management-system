using CarRentalManagementSystem.Models;
using CarRentalManagementSystem.Models.DTO;
using CarRentalManagementSystem.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRentalManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository _carRepository;
		private readonly IImageService _imageService;

		public CarsController(ICarRepository carRepository, IImageService imageService)
        {
            _carRepository = carRepository;
            _imageService = imageService;
            
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Customer")]
        public async Task<IActionResult> GetCars()
        {
            return Ok(await _carRepository.GetCarsAsync());
        }

        [HttpGet("{car_id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCar(int car_id)
        {
            var car = await _carRepository.GetCarByIdAsync(car_id);
            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }

		[HttpPost]
		[Route("add-car")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> AddCar(AddCarDTO addCarRequest)
		{
			if (string.IsNullOrEmpty(addCarRequest.FuelType))
			{
				return BadRequest(new { Message = "FuelType is required." });
			}

			// Validate Model (Automatic or Manual)
			if (addCarRequest.Model.ToLower() != "automatic" && addCarRequest.Model.ToLower() != "manual")
			{
				return BadRequest(new { Message = "Invalid Model. Must be 'Automatic' or 'Manual'." });
			}

			// Validate FuelType (Petrol, Diesel, Electric)
			if (addCarRequest.FuelType.ToLower() != "petrol" && addCarRequest.FuelType.ToLower() != "diesel" && addCarRequest.FuelType.ToLower() != "electric")
			{
				return BadRequest(new { Message = "Invalid FuelType. Must be 'Petrol', 'Diesel' or 'Electric'." });
			}

			// Validate Availability_Status (Available, Rented, Pending)
			if (addCarRequest.Availability_Status.ToLower() != "available" && addCarRequest.Availability_Status.ToLower() != "rented" && addCarRequest.Availability_Status.ToLower() != "pending")
			{
				return BadRequest(new { Message = "Invalid Availability_Status. Must be 'Available', 'Rented' or 'Pending'." });
			}

			string? imageUrl = null;
			if (addCarRequest.Image != null)
			{
				imageUrl = await _imageService.SaveImage(addCarRequest.Image);
			}

			var car = new Cars()
			{
				CarName = addCarRequest.CarName,
				Model = addCarRequest.Model,
				Year = addCarRequest.Year.ToString(),
				Color = addCarRequest.Color,
				FuelType = addCarRequest.FuelType,
				RentPrice = addCarRequest.RentPrice,
				Availability_Status = addCarRequest.Availability_Status,
				ImageUrl = imageUrl,
				Seater = addCarRequest.Seater
			};

			await _carRepository.AddCarAsync(car);
			return Ok(new { Message = "Car added successfully." });
		}

		[HttpPut("{car_id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCar(int car_id, UpdateCarDTO updateCarRequest)
        {
            var car = await _carRepository.GetCarByIdAsync(car_id);
            if (car != null)
            {
                car.CarName = updateCarRequest.CarName;
                car.Model = updateCarRequest.Model;
                car.Year = updateCarRequest.Year;
                car.Color = updateCarRequest.Color;
                car.RentPrice = updateCarRequest.RentPrice;

                await _carRepository.UpdateCarAsync(car);
                return Ok(car);
            }
            return NotFound();
        }

        [HttpDelete("{car_id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCar(int car_id)
        {
            var car = await _carRepository.GetCarByIdAsync(car_id);
            if (car != null)
            {
                if (car.Availability_Status != "Rented" && car.Availability_Status != "Pending")
                {
                    await _carRepository.DeleteCarAsync(car);
                    return Ok(new { message = "Car deleted successfully." });
                }
                return BadRequest(new { message = "Car cannot be deleted as it is rented." });
            }
            return NotFound(new { message = "Car not found." });
        }

        
        [HttpGet("rented")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRentedCars()
        {
            var rentedCars = await _carRepository.GetRentedCarsAsync();

            return Ok(rentedCars);
        }

        [HttpGet("available")]
        [Authorize(Roles = "Admin,Customer")]
        public async Task<IActionResult> GetAvailableCars()
        {
            var availableCars = await _carRepository.GetAvailableCarsAsync();
            return Ok(availableCars);
        }

		
		//[HttpGet]
  //      [Authorize(Roles = "Admin,Customer")]
		//public async Task<IActionResult> GetCarsAsync(int? seater = null, string? fuelType = null, string? model = null, string? sortBy = null)
		//{
		//	var cars = await _carRepository.GetCarsAsync(seater, fuelType, model, sortBy);
		//	return Ok(cars);
		//}
	}
}