//using CarRentalManagementSystem.Data;
//using CarRentalManagementSystem.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace CarRentalManagementSystem.Repositories
//{
//    public class PaymentRepository : IPaymentRepository
//    {
//        private readonly CarRentalDbContext _context;

//        public PaymentRepository(CarRentalDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
//        {
//            return await _context.Payments.ToListAsync();
//        }

//        public async Task<Payment> GetPaymentByIdAsync(int id)
//        {
//            return await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == id);
//        }

//        public async Task AddPaymentAsync(Payment payment)
//        {
//            _context.Payments.Add(payment);
//            await _context.SaveChangesAsync();
//        }

//        public async Task UpdatePaymentStatusAsync(int id, string status)
//        {
//            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == id);
//            if (payment != null)
//            {
//                payment.PaymentStatus = status;
//                await _context.SaveChangesAsync();
//            }
//        }
//    }
//}


using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly CarRentalDbContext _context;

        public PaymentRepository(CarRentalDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment> GetPaymentByIdAsync(int paymentId)
        {
            return await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == paymentId);
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }

        public async Task UpdatePaymentStatusAsync(int paymentId, string status)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.PaymentId == paymentId);
            if (payment != null)
            {
                payment.PaymentStatus = status;
                await _context.SaveChangesAsync();
            }
        }
    }
}