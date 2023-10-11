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
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
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
        .Include(p => p.PostTags)
        .ThenInclude(pt => pt.Tag)
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

    [HttpPost("my-posts")]
    [Authorize]
    public IActionResult CreateNewPost(Post post)
    {
        post.CreateDateTime = DateTime.Now;
        post.IsApproved = false;
        post.Category = _dbContext.Categories.Single(c => c.Id == post.CategoryId);
        post.UserProfile = _dbContext.UserProfiles.Single(up => up.Id == post.UserProfileId);

        List<PostTag> newPostTags = new List<PostTag>();

        foreach (PostTag pt in post.PostTags)
        {
            pt.Tag = _dbContext.Tags.Single(t => t.Id == pt.TagId);
            newPostTags.Add(pt);
        }

        post.PostTags = newPostTags;

        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();

        return Created($"/api/post/my-post/{post.Id}", post);
    }

    [HttpPut("my-posts/{id}")]
    [Authorize]
    public IActionResult EditPost(int id, Post post)
    {
        Post postToEdit = _dbContext.Posts.SingleOrDefault(p => p.Id == id);
        if (postToEdit == null)
        {
            return NotFound();
        }

        postToEdit.Title = post.Title;
        postToEdit.Content = post.Content;
        postToEdit.ImageLocation = post.ImageLocation;

        postToEdit.Category = _dbContext.Categories.Single(c => c.Id == post.CategoryId);

        List<PostTag> postTagsToRemove = _dbContext.PostTags.Where(pt => pt.PostId != post.Id).ToList();

        _dbContext.PostTags.RemoveRange(postTagsToRemove);

        List<PostTag> newPostTags = new List<PostTag>();

        foreach (PostTag pt in post.PostTags)
        {
            pt.Tag = _dbContext.Tags.Single(t => t.Id == pt.TagId);
            newPostTags.Add(pt);
        }

        postToEdit.PostTags = newPostTags;

        _dbContext.SaveChanges();

        return NoContent();
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
