using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetAllApprovedAndPublishedPosts()
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .Where(p => p.IsApproved == true && p.PublishDateTime < DateTime.Now)
        .OrderBy(p => p.PublishDateTime)
        .ToList());
    }
    [HttpGet("my-posts/{userId}")]
    // [Authorize]
    public IActionResult GetCurrentUserPosts(int userId)
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .Where(p => p.UserProfileId == userId)
        .OrderBy(p => p.PublishDateTime)
        .ToList());
    }
}
