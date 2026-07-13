using JobPlatform.backend.Data;
using JobPlatform.Controllers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager; // Add this
    private readonly IConfiguration _config;

    public AuthController(UserManager<ApplicationUser> userManager,
                          RoleManager<IdentityRole> roleManager,
                          IConfiguration config)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        // 1. Create Role if it doesn't exist (e.g., "Company" or "Candidate")
        if (!await _roleManager.RoleExistsAsync(model.UserType))
        {
            await _roleManager.CreateAsync(new IdentityRole(model.UserType));
        }

        var user = new ApplicationUser { UserName = model.Email, Email = model.Email, UserType = model.UserType };
        IdentityResult result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            // 2. Assign the user to the role
            await _userManager.AddToRoleAsync(user, model.UserType);
            return Ok(new { message = "User registered with role " + model.UserType });
        }
        return BadRequest(result.Errors);
    }

    private async Task<string> GenerateJwtToken(ApplicationUser user)
    {
        IConfigurationSection jwtSettings = _config.GetSection("Jwt");
        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));

        // 3. Important: Get actual roles from Identity
        IList<string> roles = await _userManager.GetRolesAsync(user);

        List<Claim> claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
        };

        // 4. Add role claims so [Authorize(Roles="...")] works
        foreach (string role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(3),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // ... Login method remains similar, but ensure it calls the updated GenerateJwtToken
}
