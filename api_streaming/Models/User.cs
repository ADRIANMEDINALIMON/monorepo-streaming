namespace api_streaming.Models
{
    public class User
    {
        public int Id { get; set; }   
        public required string Username { get; set; }
        public required string Email        { get; set; }
        public required string PasswordHash { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
