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

    [HttpGet("{id}")]
    public IActionResult GetActiveSubscriptionsByUserId(int id)
    {
        List<Subscription> CurrentActiveSubscriptions = _dbContext
        .Subscriptions
        .Where(s => s.SubscriberUserProfileId == id && s.EndDateTime == null)
        .ToList();
        if(CurrentActiveSubscriptions == null)
        {
            return NotFound();
        }
        return Ok(CurrentActiveSubscriptions);
    }

    [HttpPost]
    public IActionResult CreateNewSubscription(Subscription subscription)
    {
        subscription.BeginDateTime = DateTime.Now;

        _dbContext.Subscriptions.Add(subscription);
        _dbContext.SaveChanges();

        return Created($"/api/subscription/{subscription.Id}", subscription);
    }

    [HttpPut("{id}")]
    public IActionResult EndSubscription(int id)
    {
        Subscription subscriptionToEnd = _dbContext.Subscriptions.SingleOrDefault(s => s.Id == id);
        if (subscriptionToEnd == null)
        {
            return NotFound();
        }

        subscriptionToEnd.EndDateTime = DateTime.Now;
        _dbContext.SaveChanges();

        return NoContent();
    }

}