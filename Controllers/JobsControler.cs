using backend.Controllers;
using backend.Data;
using JobPlatform.backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

    // Only Users in the "Company" role can post jobs
    [HttpPost]
    [Authorize(Roles = "Company")]
    public async Task<IActionResult> PostJob(Job job)
    {
        _db.Jobs.Add(job);
        await _db.SaveChangesAsync();
        return Ok(job);
    }

    [HttpPost]
    [Authorize(Roles = "Company")]
    public async Task<IActionResult> CreateJob([FromBody] JobDto model)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var job = new Job
        {
            Title = model.Title,
            Description = model.Description,
            CompanyName = model.CompanyName,
            Category = model.Category,
            PostedByUserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _db.Jobs.Add(job);
        await _db.SaveChangesAsync();
        return Ok(job);

        public record JobDto(string Title, string Description, string CompanyName, string Category);
}