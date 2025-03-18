using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore.Internal;
using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models
{
    public class Cars
    {
        [Key]
        public int CarId { get; set; }
        [Required]
      
        public string CarName { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public string Year { get; set; }
        [Required]
        public string FuelType { get; set; }
        [Required]
        public decimal RentPrice { get; set; }
        [Required]
        public string Availability_Status { get; set; }
		public string? ImageUrl { get; set; }
        public int Seater { get; set; }
		public int RentCarId { get; set; }
        public ICollection<RentCar> RentCars { get; set; }
    }
}
