using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tabloid.Models;

public class Post
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Content { get; set; }
    public string ImageLocation { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime? PublishDateTime { get; set; }
    public bool IsApproved { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    public int UserProfileId { get; set;}
    public UserProfile UserProfile { get; set;}
    public List<PostTag> PostTags { get; set;}
    public List<PostReaction> PostReactions { get; set;}
    [NotMapped]
    public List<PostReactionDTO> PostReactionDTOs { get; set; }

}