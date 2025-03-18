using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using CarRentalManagementSystem.Models.DTO;
using CarRentalManagementSystem.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;


namespace CarRentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly CarRentalDbContext _context;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(IPaymentRepository paymentRepository, CarRentalDbContext context,ILogger<PaymentController> logger)
        {
            _paymentRepository = paymentRepository;
            _context = context;
            _logger = logger;
        }

        
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _paymentRepository.GetAllPaymentsAsync();
            return Ok(payments);
        }

        
        [HttpGet("{id}")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            var payment = await _paymentRepository.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        
        [HttpPost]
        [Authorize(Roles = "Customer")]
        [Route("make-payment")]
        public async Task<IActionResult> AddPayment([FromBody] PaymentDTO model)
        {
            var rentCar = await _context.RentCars.FirstOrDefaultAsync(rc => rc.RentCarId == model.RentCarId);
            if (rentCar == null)
            {
                return BadRequest("RentCar does not exist in the database.");
            }
            if( rentCar.RentStatus == "Paid")
            {
                return BadRequest("Car rent has already been Paid");
            }

            if (rentCar.RentStatus != "Accepted")
            {
                return BadRequest("Car rental must be accepted before making a payment.");
            }

            if (rentCar.Amount != model.Amount)
            {
                return BadRequest("Payment amount mismatch.");
            }

            var payment = new Payment
            {
                RentCarId = model.RentCarId,
                Amount = model.Amount,
                PaymentDate = DateTime.Now,
                PaymentStatus = "Completed",
                PaymentMethod = model.PaymentMethod,
                UpiId = model.UpiId,
                CardNumber = model.CardNumber,
                CardName = model.CardName,
                ExpiryMonth = model.ExpiryMonth,
                ExpiryYear = model.ExpiryYear,
                CVV = model.CVV
            };

            
            if (payment.PaymentMethod == "UPI" && string.IsNullOrEmpty(payment.UpiId))
            {
                return BadRequest("UPI ID is required for UPI payments.");
            }
            else if (payment.PaymentMethod == "Card" &&
                     (string.IsNullOrEmpty(payment.CardNumber) || string.IsNullOrEmpty(payment.CardName) ||
                      !payment.ExpiryMonth.HasValue || !payment.ExpiryYear.HasValue || !payment.CVV.HasValue))
            {
                return BadRequest("Card details are required for card payments.");
            }
            else if (payment.PaymentMethod != "UPI" && payment.PaymentMethod != "Card")
            {
                return BadRequest("Invalid payment method.");
            }

            await _paymentRepository.AddPaymentAsync(payment);
            rentCar.RentStatus = "Paid";
            await _context.SaveChangesAsync();

            try
            {
                rentCar = await _context.RentCars
                                                .Include(r => r.Carss)
                                                .FirstOrDefaultAsync(r => r.RentCarId == model.RentCarId);
                if (rentCar == null)
                {
                    return NotFound();
                }
                var email = User.FindFirstValue(ClaimTypes.NameIdentifier);

                var sb = new StringBuilder();

                sb.AppendLine("Dear Customer,");
                sb.AppendLine();
                sb.AppendLine($"Thank you for your car rental order (Order ID: {rentCar.RentCarId}) placed on {rentCar.RentFromDate:dd MMM yyyy}.");
                sb.AppendLine();
                sb.AppendLine("Order Details:");
                sb.AppendLine("--------------------------------------------------");
                sb.AppendLine($"Customer ID: {rentCar.CustomerId}");
                sb.AppendLine($"Rent From Date: {rentCar.RentFromDate:dd MMM yyyy}");
                sb.AppendLine($"Rent To Date: {rentCar.RentToDate:dd MMM yyyy}");
                sb.AppendLine($"Rent Status: {rentCar.RentStatus}");
                sb.AppendLine($"Amount: {rentCar.Amount}");
                sb.AppendLine();
                sb.AppendLine("Car Details:");
                sb.AppendLine("--------------------------------------------------");
                sb.AppendLine($"Car ID: {rentCar.CarId}");
                sb.AppendLine($"Car Name: {rentCar.Carss.CarName}");
                sb.AppendLine($"Model: {rentCar.Carss.Model}");
                sb.AppendLine($"Color: {rentCar.Carss.Color}");
                sb.AppendLine($"Year: {rentCar.Carss.Year}");
                sb.AppendLine($"Fuel Type: {rentCar.Carss.FuelType}");
                sb.AppendLine();
                sb.AppendLine("Thank you for choosing our car rental service.");
                sb.AppendLine("Best regards,");
                sb.AppendLine("Car Rental Management System");

                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("srivatsavpenugonda18@gmail.com", "vgvhcaudrcaoxvuv"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("srivatsavpenugonda18@gmail.com", "Penugonda Srivatsav"),
                    Subject = "Your Car Rental Order Details",
                    Body = sb.ToString(),
                    IsBodyHtml = false,
                };

                _logger.LogInformation(email);
                mailMessage.To.Add(email);

                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (SmtpException ex)
            {
                throw new Exception(ex.Message);
            }

            return Ok(new { Status = "Success", Message = "Payment made successfully!", RentCar = rentCar, Payment = payment });
        }

        // Update payment status
        //[HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] string status)
        //{
        //    await _paymentRepository.UpdatePaymentStatusAsync(id, status);
        //    return Ok(new { Status = "Success", Message = "Payment status updated successfully!" });
        //}

        [HttpGet("bill/{paymentId}")]
        [Authorize(Roles = "Customer,Admin")]
        public async Task<IActionResult> GenerateBill(int paymentId)
        {
            var payment = await _paymentRepository.GetPaymentByIdAsync(paymentId);
            if (payment == null)
            {
                return NotFound(new { Status = "Error", Message = "Payment not found." });
            }

            var rentCar = await _context.RentCars.FirstOrDefaultAsync(rc => rc.RentCarId == payment.RentCarId);
            if (rentCar == null)
            {
                return NotFound(new { Status = "Error", Message = "RentCar not found." });
            }

            var car = await _context.Cars.FirstOrDefaultAsync(c => c.CarId == rentCar.CarId);
            if (car == null)
            {
                return NotFound(new { Status = "Error", Message = "Car not found." });
            }

            var customer = await _context.Customers.FirstOrDefaultAsync(u => u.CustomerId == rentCar.CustomerId);
            if (customer == null)
            {
                return NotFound(new { Status = "Error", Message = "Customer not found." });
            }

            var bill = new BillDTO
            {
                Customer_Name=customer.Customer_Name,
                PaymentDate = payment.PaymentDate,
                FromDate = rentCar.RentFromDate,
                ToDate = rentCar.RentToDate,
                CarName = car.CarName,
                Model = car.Model,
                Color = car.Color,
                Year = car.Year,
                FuelType = car.FuelType,
                AmountPaid = payment.Amount
            };

            return Ok(bill);
        }
    }
}
    