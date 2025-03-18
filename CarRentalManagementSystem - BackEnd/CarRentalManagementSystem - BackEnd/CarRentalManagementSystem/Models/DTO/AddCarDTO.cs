using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models.DTO
{
    public class AddCarDTO
    {
        [Required]
        public string CarName { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Color { get; set; }
		[Required]
		[Range(1900, 2100, ErrorMessage = "Invalid Year. Must be between 1900 and 2100.")] // Add validation for year
		public int Year { get; set; }
		[Required]
        public string FuelType { get; set; }
        [Required]
        public decimal RentPrice { get; set; }
        [Required]  
        public string Availability_Status { get; set; }
		public IFormFile? Image { get; set; }
		public int Seater { get; set; }
	}
}