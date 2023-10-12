using Tabloid.Data;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("/api/[controller]")]

public class ReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public ReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetReactions()
    {
        return Ok(_dbContext.Reactions.OrderBy(r => r.Name).ToList());
    }

    [HttpGet("unused/{postId}")]
    [Authorize]
    public IActionResult GetUnusedReactions(int postId)
    {
        var loggedInUser = _dbContext
             .UserProfiles
             .SingleOrDefault(up => up.IdentityUserId == User.FindFirst(ClaimTypes.NameIdentifier).Value);

        List<PostReaction> postReactionsFromCurrentUserOnSinglePost = _dbContext.PostReactions.Where(pr => pr.PostId == postId && pr.UserProfileId == loggedInUser.Id).ToList();

        List<Reaction> unusedReactions = _dbContext.Reactions
        .Where(r => !postReactionsFromCurrentUserOnSinglePost
            .Select(cpr => cpr.ReactionId)
            .Contains(r.Id))
        .OrderByDescending(r => r.Name)
        .ToList();

        return Ok(unusedReactions);
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateReaction(Reaction newReaction)
    {
        _dbContext.Reactions.Add(newReaction);
        _dbContext.SaveChanges();
        return Created($"/api/reaction/{newReaction.Id}", newReaction);
    }


}

