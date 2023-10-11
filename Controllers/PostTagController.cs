using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostTagController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public PostTagController(TabloidDbContext db)
    {
        _dbContext = db;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetPostTags()
    {
        return Ok(_dbContext.PostTags
        .Include(pt => pt.Post)
        .Include(pt => pt.Tag)
        .OrderBy(pt => pt.Tag.Name).ToList());
    }


    [HttpPost]
    // [Authorize]
    public IActionResult EditPostTags(int postId, List<PostTag> PostTagList)
    {
        List<PostTag> foundItems = _dbContext.PostTags.Where(pt => pt.PostId == postId).ToList();
        foreach (PostTag fi in foundItems)
        {
            _dbContext.PostTags.Remove(fi);
            _dbContext.SaveChanges();
        }

        foreach (PostTag pt in PostTagList)
        {
            PostTag newPostTag = new PostTag()
            {
                PostId = postId,
                TagId = pt.TagId,
            };
            _dbContext.PostTags.Add(newPostTag);
            _dbContext.SaveChanges();
        }
        return Ok(_dbContext.PostTags);
    }
}