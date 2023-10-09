using Tabloid.Data;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/api/[controller]")]

public class TagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public TagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]

    public IActionResult GetTags()
    {
        return Ok(_dbContext.Tags.OrderBy(t => t.Name).ToList());
    }

    [HttpPost]
    // [Authorize]

    public IActionResult CreateTag(Tag newTag)
    {
        _dbContext.Tags.Add(newTag);
        _dbContext.SaveChanges();
        return Created($"/api/tag/{newTag.Id}", newTag);
    }

}
