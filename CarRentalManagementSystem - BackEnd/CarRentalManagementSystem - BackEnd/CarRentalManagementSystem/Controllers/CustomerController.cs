using CarRentalManagementSystem.Authentication;
using CarRentalManagementSystem.Models;
using CarRentalManagementSystem.Models.DTO;
using CarRentalManagementSystem.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarRentalManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IRentCarRepository _rentCarRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ICarRentRepository _carRentRepository;

        public CustomerController(
            ICustomerRepository customerRepository,
            IRentCarRepository rentCarRepository,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
          )
        {
            _customerRepository = customerRepository;
            _rentCarRepository = rentCarRepository;
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] CustomerRegister model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Customer already exists!" });

            ApplicationUser user = new ApplicationUser
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Customer_Name,
                PhoneNumber = model.Phone_Number,
            };

            Customer customer = new Customer
            {
                Customer_Name = model.Customer_Name,
                Email = model.Email,
                Password = model.Password,
                Phone_Number = model.Phone_Number,
                Address = model.Address,
                AadharCardNumber = model.AadharCardNumber,
            };

            await _customerRepository.AddCustomerAsync(customer);

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }

            if (!await _roleManager.RoleExistsAsync(UserRoles.Customer))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Customer));

            if (await _roleManager.RoleExistsAsync(UserRoles.Customer))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Customer);
            }

            return Ok(new Response { Status = "Success", Message = "Customer created successfully!" });
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] CustomerLogin model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier,user.Email)
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var secret = _configuration["JWT:Key"];
                if (string.IsNullOrEmpty(secret))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "JWT Key is not configured properly." });
                }

                SymmetricSecurityKey authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
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
        public async Task<IActionResult> GetAllCustomer()
        {
            var customer = await _customerRepository.GetAllCustomers();
            return Ok(customer);
        }

        [Authorize(Roles = UserRoles.Customer)]
        [Route("ChangePassword")]
        [HttpPost]

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
    }
}