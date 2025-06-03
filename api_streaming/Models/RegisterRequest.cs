namespace api_streaming.Models
{
/// <summary>
/// petición para registrar un nuevo usuario
/// </summary>
    public class RegisterRequest
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
