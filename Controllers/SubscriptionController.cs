using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SubscriptionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public SubscriptionController(TabloidDbContext db)
    {
        _dbContext = db;
    }

    [HttpPost]
    public IActionResult CreateNewSubscription(Subscription subscription)
    {
        subscription.BeginDateTime = DateTime.Now;

        _dbContext.Subscriptions.Add(subscription);
        _dbContext.SaveChanges();

        return Created($"/api/subscription/{subscription.Id}", subscription);
    }

}