
namespace api_streaming.Models
{
    /// <summary>
    /// petición para actualizar datos de un usuario existente
    /// </summary>
    public class UpdateUserRequest
    {
        /// <summary>nuevo username (opcional)</summary>
        public string? Username { get; set; }

        /// <summary>nuevo email (opcional)</summary>
        public string? Email { get; set; }

        /// <summary>nueva contraseña en texto plano (opcional)</summary>
        public string? Password { get; set; }
    }
}
