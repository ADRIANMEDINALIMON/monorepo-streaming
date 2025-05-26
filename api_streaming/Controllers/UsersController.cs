using Microsoft.AspNetCore.Mvc;
using System.Linq;
using api_streaming.Data;
using api_streaming.Models;

namespace api_streaming.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // obtiene lista de usuarios con campos basicos
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.IsActive,
                    u.CreatedAt,
                    u.UpdatedAt
                })
                .ToList();

            return Ok(users);
        }

        // valida credenciales y retorna user si es correcto
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // valida que email y password existan en request
            if (request == null
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "email y contrasena son requeridos" });
            }

            // busca user por email
            var user = _context.Users.SingleOrDefault(u => u.Email == request.Email);

            // verifica password y user activo
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "usuario o contrasena incorrectos" });
            }

            // retorna resultado exitoso con datos minimos del usuario
            return Ok(new
            {
                message = "login correcto",
                user = new
                {
                    user.Id,
                    user.Username,
                    user.Email
                }
            });
        }

        // compara password recibido con el hash almacenado 
        private bool VerifyPassword(string inputPassword, string storedPasswordHash)
        {
            return inputPassword == storedPasswordHash;
        }
    }
}
