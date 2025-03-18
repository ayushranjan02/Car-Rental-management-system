using CarRentalManagementSystem.Authentication;
using CarRentalManagementSystem.Data;
using CarRentalManagementSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CarRentalManagementSystem.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly CarRentalDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminRepository(CarRentalDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<Admin> RegisterAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return admin;
        }
        public async Task UpdateAdminPassword(string newpassword,string email)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(c => c.Email == email);
            admin.Password = newpassword;
            _context.Admins.Update(admin);
            _context.SaveChanges();

        }
        public async Task<ApplicationUser> RegisterUser(ApplicationUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                throw new System.Exception("User registration failed");
            }
            return user;
        }

        public async Task<bool> RoleExists(string role)
        {
            return await _roleManager.RoleExistsAsync(role);
        }

        public async Task<bool> UserExistsAsync( string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        public async Task CreateRole(string role)
        {
            await _roleManager.CreateAsync(new IdentityRole(role));
        }

        public async Task AddUserToRole(ApplicationUser user, string role)
        {
            await _userManager.AddToRoleAsync(user, role);
        }

        public async Task<Admin> GetAdminByEmail(string email)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Email == email);
        }

        public async Task<IEnumerable<Admin>> GetAllAdmins()
        {
            return await _context.Admins.ToListAsync();
        }

        public async Task<Admin> GetAdminById(int adminId) // Change the type to int
        {
            return await _context.Admins.FindAsync(adminId);
        }

        public async Task DeleteAdmin(int adminId) // Change the type to int
        {
            var admin = await _context.Admins.FindAsync(adminId);
            if (admin != null)
            {
                _context.Admins.Remove(admin);
                await _context.SaveChangesAsync();
            }
        }
    }
}