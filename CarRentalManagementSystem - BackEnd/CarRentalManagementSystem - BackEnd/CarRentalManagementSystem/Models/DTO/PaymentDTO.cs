using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models.DTO
{
    public class PaymentDTO
    {
        [Required]
        public int RentCarId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string PaymentMethod { get; set; } // UPI or Card

        // UPI specific fields
        public string? UpiId { get; set; }

        // Card specific fields
        public string? CardNumber { get; set; }
        public string? CardName { get; set; }
        public int? ExpiryMonth { get; set; }
        public int? ExpiryYear { get; set; }
        public int? CVV { get; set; }
    }
}