namespace CarRentalManagementSystem.Models.DTO
{
    public class RequestRentCarDTO
    {
        public int CarId { get; set; }
        public DateTime RentFromDate { get; set; }
        public DateTime RentToDate { get; set; }
    }
}