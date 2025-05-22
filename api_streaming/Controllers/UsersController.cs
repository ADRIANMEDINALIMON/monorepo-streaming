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

        // GET: api/Users
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

        // POST: api/Users/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Email y contraseña son requeridos." });
            }

            var user = _context.Users.SingleOrDefault(u => u.Email == request.Email);
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Usuario o contraseña incorrectos." });
            }

            // TODO: En producción aquí generarías un JWT y lo devolverías.
            // Por ahora devolvemos un objeto simple:
            return Ok(new
            {
                message = "Login correcto.",
                user = new
                {
                    user.Id,
                    user.Username,
                    user.Email
                }
            });
        }

        // En producción reemplaza esto por un hash seguro (BCrypt, etc.)
        private bool VerifyPassword(string inputPassword, string storedPasswordHash)
        {
            return inputPassword == storedPasswordHash;
        }
    }
}
