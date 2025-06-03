namespace api_streaming.Models

    {/// <summary>
    /// petición para hacer login con email y contraseña
    /// </summary>
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}