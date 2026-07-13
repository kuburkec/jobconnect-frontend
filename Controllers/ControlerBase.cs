using JobPlatform.backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JobPlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                UserType = model.UserType // "Company" or "Candidate"
            };

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            string token = GenerateJwtToken(user);

            return Ok(new
            {
                token,
                userType = user.UserType,
                email = user.Email
            });
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            IConfigurationSection jwtSettings = _config.GetSection("Jwt");
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Claims information stored inside the token
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("userType", user.UserType)
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3), // Token expiration
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public JobsController(AppDbContext db)
        {
            _db = db;
        }

        // Anyone (even guest) can see jobs
        [HttpGet]
        public async Task<ActionResult> GetJobs() => Ok(await _db.Jobs.ToListAsync());

        // Only Users in the "Company" role can post jobs
        [HttpPost]
        [Authorize(Roles = "Company")]
        public async Task<IActionResult> PostJob(Job job)
        {
            _db.Jobs.Add(job);
            await _db.SaveChangesAsync();
            return Ok(job);
        }
    }

    // Data Transfer Objects (DTOs)
    public record RegisterDto(string Email, string Password, string UserType);
    public record LoginDto(string Email, string Password);

    //Configuration Required(appsettings.json)
    //{
    //   "Jwt": {
    //     "Key": "YOUR_SUPER_SECRET_LONG_KEY_PHRASE_32_CHARS",
    //     "Issuer": "JobPlatform",
    //     "Audience": "JobPlatformClient"
    //   }
    //}
}