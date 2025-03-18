namespace CarRentalManagementSystem.Models.DTO
{
    public class BillDTO
    {
        public string Customer_Name { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string CarName { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Year { get; set; }
        public string FuelType { get; set; }
        public decimal AmountPaid { get; set; }
    }
}