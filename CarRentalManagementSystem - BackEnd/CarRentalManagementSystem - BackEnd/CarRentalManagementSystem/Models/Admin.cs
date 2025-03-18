using CarRentalManagementSystem.Authentication;
using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }

        [Required] 
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Phone_Number { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
