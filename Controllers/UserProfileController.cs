using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public UserProfileController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            IsActive = up.IsActive,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    [HttpPost("promote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Promote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("demote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Demote(string id)
    {
        IdentityRole role = _dbContext.Roles
            .SingleOrDefault(r => r.Name == "Admin");

        IdentityUserRole<string> userRole = _dbContext
            .UserRoles
            .SingleOrDefault(ur =>
                ur.RoleId == role.Id &&
                ur.UserId == id);

        _dbContext.UserRoles.Remove(userRole);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [Authorize]
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        UserProfile user = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound();
        }
        user.Email = user.IdentityUser.Email;
        user.UserName = user.IdentityUser.UserName;
        user.Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == user.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList();
        return Ok(user);
    }

    [HttpPost("activate/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Activate(int id)
    {
        UserProfile foundUser = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        foundUser.IsActive = true;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("deactivate/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Deactivate(int id)
    {
        List<UserProfile> Admins = _dbContext.UserProfiles.Select(
            up => new UserProfile
            {
                Id = up.Id,
                IsActive = up.IsActive,
                Roles = _dbContext.UserRoles.Where(ur => ur.UserId == up.IdentityUserId).Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name).ToList()
            })
            .Where(up => up.Roles.Contains("Admin") && up.IsActive == true).ToList();

        UserProfile foundUser = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        foreach (UserProfile admin in Admins)
        {
            if (admin.Id == foundUser.Id && Admins.Count < 2)
            {
                return BadRequest("You must have atleast one admin active at all times. Please make someone else an admin before the User Profile can be deactivated");
            }
        }
        foundUser.IsActive = false;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("updateprofilepic")]
    [Authorize]
    public IActionResult UpdateProfilePic([FromBody]string url)
    {
        var userProfileToUpdate = _dbContext
            .UserProfiles
            .SingleOrDefault(up => up.IdentityUserId == User.FindFirst(ClaimTypes.NameIdentifier).Value);

        if (userProfileToUpdate == null)
        {
            return BadRequest();
        }

        userProfileToUpdate.ImageLocation = url;
        _dbContext.SaveChanges();

        return NoContent();
    }


}