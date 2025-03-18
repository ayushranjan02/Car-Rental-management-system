using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models.DTO
{
    public class UpdatePasswordDTO
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        [Compare("NewPassword",ErrorMessage ="Password doesnot match")]
        public string ConfirmPassword { get; set; }
    }
}
