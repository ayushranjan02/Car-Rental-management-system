namespace CarRentalManagementSystem.Models.DTO
{
    public class UpdateCarDTO
    {
        public int CarId { get; set; }
        public string CarName { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Year { get; set; }
        public string FuelType { get; set; }
        public decimal RentPrice { get; set; }
        public string Availability_Status { get; set; }
    }
}