using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models.DTO
{
    public class CustomerLogin
    {
        public string Email { get; set; }  
        [Required]
        public string Password { get; set; }
    }
}
