using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;

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

    [HttpPost]
    [Authorize]
    public IActionResult CreateCategory(Category category)
    {
        _dbContext.Categories.Add(category);
        _dbContext.SaveChanges();
        return Created($"/api/category/{category.Id}", category);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetCategoryById(int id)
    {
        Category category = _dbContext
        .Categories
        .SingleOrDefault(c => c.Id == id);
        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateCategory(Category category, int id)
    {
        Category categoryToUpdate = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
        if (categoryToUpdate == null)
        {
            return NotFound();
        }
        else if (id != category.Id)
        {
            return BadRequest();
        }
        categoryToUpdate.Name = category.Name;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteCategory(int id) 
    {
        Category CategoryToDelete = _dbContext.Categories.SingleOrDefault(c => c.Id == id);

        if (CategoryToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Remove(CategoryToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }
}