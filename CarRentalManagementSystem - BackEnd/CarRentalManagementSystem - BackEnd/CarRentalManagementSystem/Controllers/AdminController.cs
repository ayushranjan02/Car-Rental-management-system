using CarRentalManagementSystem.Models.DTO;
using CarRentalManagementSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarRentalManagementSystem.Authentication;
using Microsoft.AspNetCore.Authorization;
using CarRentalManagementSystem.Repositories;

namespace CarRentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AdminController> _logger;

        public AdminController(IAdminRepository adminRepository, IConfiguration configuration, UserManager<ApplicationUser> userManager, ILogger<AdminController> logger)
        {
            _adminRepository = adminRepository;
            _configuration = configuration;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] AdminRegister model)
        {

            if (await _adminRepository.UserExistsAsync(model.Email))
            {
                return Conflict(new { message = "Username already exists" });
            }
            ApplicationUser user = new ApplicationUser
            {
                Email = model.Email,
                SecurityStamp = System.Guid.NewGuid().ToString(),
                UserName = model.Email,
                PhoneNumber = model.Phone_Number,
            };

            Admin admin = new Admin
            {
                Email = model.Email,
                Name = model.Name,
                Password = model.Password,
                Phone_Number = model.Phone_Number,
            };

            await _adminRepository.RegisterAdmin(admin);

            var result = await _userManager.CreateAsync(user, model.Password);
            try
            {
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return BadRequest(ModelState);
                }
            }
            catch(Exception ex)
            {
                _logger.LogError("Successfull");
            }
           

            if (!await _adminRepository.RoleExists(UserRoles.Admin))
                await _adminRepository.CreateRole(UserRoles.Admin);

            if (await _adminRepository.RoleExists(UserRoles.Admin))
            {
                await _adminRepository.AddUserToRole(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "Admin created successfully!" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] AdminLogin model)
        {
            var admin = await _adminRepository.GetAdminByEmail(model.Email);
            if (admin != null && admin.Password == model.Password)
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, admin.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, System.Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier,admin.Email),
                    new Claim(ClaimTypes.Role, UserRoles.Admin)
                }; 

                var secret = _configuration["JWT:Key"];
                if (string.IsNullOrEmpty(secret))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "JWT Key is not configured properly." });
                }

                SymmetricSecurityKey authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: System.DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetAllAdmin()
        {
            var admin = await _adminRepository.GetAllAdmins();
            return Ok(admin);
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(UpdatePasswordDTO model)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return NotFound();   
            }

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (result.Succeeded)
            {
                await _adminRepository.UpdateAdminPassword(model.NewPassword,user.Email);
                return Ok(new Response { Status = "Success", Message = "Password Changed successfully!" });
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{adminId}")]
        public async Task<IActionResult> DeleteAdmin(int adminId)
        {
            var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            if (currentUser == null)
            {
                return Unauthorized();
            }

            var adminToDelete = await _adminRepository.GetAdminById(adminId);
            if (adminToDelete == null)
            {
                return NotFound(new Response { Status = "Error", Message = "Admin not found!" });
            }

            try
            {
                await _adminRepository.DeleteAdmin(adminId);
                var userToDelete = await _userManager.FindByEmailAsync(adminToDelete.Email);
                if (userToDelete != null)
                {
                    await _userManager.DeleteAsync(userToDelete);
                }

                _logger.LogInformation($"Admin with ID {adminId} deleted successfully.");
                return Ok(new Response { Status = "Success", Message = "Admin deleted successfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting admin with ID {adminId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "An error occurred while deleting the admin." });
            }
        }
    }
}