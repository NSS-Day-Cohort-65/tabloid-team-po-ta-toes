using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoryController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CategoryController(TabloidDbContext db)
    {
        _dbContext = db;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Categories.OrderBy(c => c.Name).ToList());
    }
}