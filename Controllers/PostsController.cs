using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

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
    [Authorize]
    public IActionResult GetAllApprovedAndPublishedPosts()
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .Where(p => p.IsApproved == true && p.PublishDateTime < DateTime.Now)
        .OrderBy(p => p.PublishDateTime)
        .ToList());
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetSinglePost(int id)
    {
        Post post = _dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .SingleOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }
}
