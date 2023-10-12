using Tabloid.Data;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("/api/[controller]")]

public class PostReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreatePostReaction(PostReaction newPostReaction)
    {
        _dbContext.PostReactions.Add(newPostReaction);
        _dbContext.SaveChanges();
        return Created($"/api/postreaction/{newPostReaction.Id}", newPostReaction);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeletePostReaction(int id)
    {
        var loggedInUser = _dbContext
             .UserProfiles
             .SingleOrDefault(up => up.IdentityUserId == User.FindFirst(ClaimTypes.NameIdentifier).Value);

        PostReaction prToDelete = _dbContext.PostReactions.SingleOrDefault(pr => pr.ReactionId == id && pr.UserProfileId == loggedInUser.Id);

        if (prToDelete == null) {
            return NotFound();
        }

        _dbContext.PostReactions.Remove(prToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

}

