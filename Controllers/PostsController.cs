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
    [Authorize]
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

    [HttpGet("my-posts/{userId}")]
    [Authorize]
    public IActionResult GetCurrentUserPosts(int userId)
    {
        return Ok(_dbContext.Posts
        .Include(p => p.Category)
        .Include(p => p.UserProfile)
        .Where(p => p.UserProfileId == userId)
        .OrderBy(p => p.PublishDateTime)
        .ToList());

    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeletePost(int id) 
    {
        Post PostToDelete = _dbContext.Posts.SingleOrDefault(p => p.Id == id);

        if (PostToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Remove(PostToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }
}
