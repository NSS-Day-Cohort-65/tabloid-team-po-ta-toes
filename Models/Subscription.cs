using System.ComponentModel.DataAnnotations.Schema;

namespace Tabloid.Models;

public class Subscription
{
    public int Id { get; set; }
    public int SubscriberUserProfileId { get; set; }
    [ForeignKey("SubscriberUserProfileId")]
    public UserProfile SubscriberUserProfile { get; set;}
    public int ProviderUserProfileId { get; set; }
    [ForeignKey("ProviderUserProfileId")]
    public UserProfile ProviderUserProfile { get; set;}
    public DateTime BeginDateTime { get; set;}
    public DateTime EndDateTime { get; set;}

}