using System.ComponentModel.DataAnnotations;

namespace CarRentalManagementSystem.Models
{
    public class RentCar
    {
        [Key]
        public int RentCarId { get; set; }

   
        public DateTime RentFromDate { get; set; }
        public DateTime RentToDate { get; set; }
        public decimal Amount { get; set; }
        public string? ApprovedBy { get; set; }
        public string RentStatus { get; set; } 

        //navigation prop
        public int? CarId { get; set; }
        public Cars Carss { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customers { get; set; }
    }
}