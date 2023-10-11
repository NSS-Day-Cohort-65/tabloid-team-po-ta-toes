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

    [HttpPost]
    [Authorize]
    public IActionResult CreateNewComment(Comment newComment)
    {
        newComment.CreateDateTime = DateTime.Now;
        _dbContext.Comments.Add(newComment);
        _dbContext.SaveChanges();
        return Created($"/api/comment/{newComment.Id}", newComment);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteComment(int id)
    {
        Comment commentToDelete = _dbContext.Comments.SingleOrDefault(p => p.Id == id);

        if (commentToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Comments.Remove(commentToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

}