using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CommentController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CommentController(TabloidDbContext db)
    {
        _dbContext = db;
    }

    [HttpGet("post/{id}")]
    [Authorize]
    public IActionResult GetCommentsByPostId(int id)
    {
        List<Comment> postComments = _dbContext
        .Comments
        .Include(c => c.UserProfile)
        .ThenInclude(up => up.IdentityUser)
        .Where(c => c.PostId == id)
        .OrderBy(c => c.CreateDateTime)
        .ToList();
        if (postComments == null)
        {
            return NotFound();
        }
        return Ok(postComments);
    }
}