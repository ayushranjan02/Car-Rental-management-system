using CarRentalManagementSystem.Authentication;
using CarRentalManagementSystem.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRentalManagementSystem.Repositories
{
    public interface IAdminRepository
    {
        Task<Admin> RegisterAdmin(Admin admin);
        Task<bool> RoleExists(string role);
        Task CreateRole(string role);
        Task AddUserToRole(ApplicationUser user, string role);
        Task<Admin> GetAdminByEmail(string email);
        Task<IEnumerable<Admin>> GetAllAdmins();
        Task<bool> UserExistsAsync(string email);
        Task UpdateAdminPassword(string newpassword, string email);
        Task<Admin> GetAdminById(int adminId); 
        Task DeleteAdmin(int adminId); 

    }
}