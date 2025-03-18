using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models.DTO
{
    public class AdminRegister
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Phone_Number { get; set; }
        [Required]
        public string Password { get; set; }
    }
}