using Tabloid.Data;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpPost]
    [Authorize]
    public IActionResult CreateReaction(Reaction newReaction)
    {
        _dbContext.Reactions.Add(newReaction);
        _dbContext.SaveChanges();
        return Created($"/api/reaction/{newReaction.Id}", newReaction);
    }


}

