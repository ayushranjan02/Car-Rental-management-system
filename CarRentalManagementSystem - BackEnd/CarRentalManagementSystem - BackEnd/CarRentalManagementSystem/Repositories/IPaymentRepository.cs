//using CarRentalManagementSystem.Models;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace CarRentalManagementSystem.Repositories
//{
//    public interface IPaymentRepository
//    {
//        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
//        Task<Payment> GetPaymentByIdAsync(int id);
//        Task AddPaymentAsync(Payment payment);
//        Task UpdatePaymentStatusAsync(int id, string status);
//    }
//}

using CarRentalManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<Payment> GetPaymentByIdAsync(int paymentId);
        Task<IEnumerable<Payment>> GetAllPaymentsAsync();
        Task UpdatePaymentStatusAsync(int paymentId, string status);
    }
}