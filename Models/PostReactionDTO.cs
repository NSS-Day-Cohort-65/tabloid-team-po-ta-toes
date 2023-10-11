namespace Tabloid.Models;

public class PostReactionDTO
{
    public string Name { get; set; }
    public string ImageLocation { get; set; }
    public int Count { get; set; } 
    public bool ReactedByCurrentUser { get; set; }
    public Reaction Reaction { get; set; }
}