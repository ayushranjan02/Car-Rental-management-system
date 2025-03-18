using CarRentalManagementSystem.Authentication;
using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        public string Customer_Name { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Phone_Number { get; set; }

        [Required]
        public required string Address { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string AadharCardNumber { get; set; }
    }
}