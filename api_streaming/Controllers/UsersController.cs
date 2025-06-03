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


        // valida credenciales y retorna user si es correcto

        /// <summary>
        /// valida credenciales y retorna datos del usuario
        /// </summary>
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
        // POST api/users/register

        /// <summary>
        /// registra un nuevo usuario (usuario, email, contraseña)
        /// </summary>
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (request == null 
                || string.IsNullOrWhiteSpace(request.Email) 
                || string.IsNullOrWhiteSpace(request.Password) 
                || string.IsNullOrWhiteSpace(request.Username))
            {
                return BadRequest(new { message = "todos los campos son requeridos" });
            }

            // valida duplicados
            var existe = _context.Users.Any(u => u.Email == request.Email 
                                            || u.Username == request.Username);
            if (existe)
                return BadRequest(new { message = "usuario o email ya existen" });

            var newUser = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = request.Password, // en produccion deberias hashear
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new { message = "registro exitoso", userId = newUser.Id });
        }
                // obtiene lista de usuarios con campos basicos

        /// <summary>
        /// obtiene lista de usuarios
        /// </summary>
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
                /// <summary>
        /// obtiene un usuario por su id
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users
                .Where(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.IsActive,
                    u.CreatedAt,
                    u.UpdatedAt
                })
                .SingleOrDefault();

            if (user == null)
            {
                return NotFound(new { message = "usuario no encontrado" });
            }

            return Ok(user);
        }

        /// <summary>
        /// actualiza datos de un usuario existente
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserRequest request)
        {
            // valida que al menos un campo exista
            if (request == null
                || (string.IsNullOrWhiteSpace(request.Username)
                    && string.IsNullOrWhiteSpace(request.Email)
                    && string.IsNullOrWhiteSpace(request.Password)))
            {
                return BadRequest(new { message = "al menos un campo valido es requerido" });
            }

            // busca el usuario a modificar
            var user = _context.Users.SingleOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "usuario no encontrado" });
            }

            // valida duplicado de email o username si cambio alguno
            if (!string.IsNullOrWhiteSpace(request.Email)
                && _context.Users.Any(u => u.Email == request.Email && u.Id != id))
            {
                return BadRequest(new { message = "email ya existe" });
            }
            if (!string.IsNullOrWhiteSpace(request.Username)
                && _context.Users.Any(u => u.Username == request.Username && u.Id != id))
            {
                return BadRequest(new { message = "username ya existe" });
            }

            // actualiza campos si vienen en request
            if (!string.IsNullOrWhiteSpace(request.Username))
            {
                user.Username = request.Username;
            }
            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                user.Email = request.Email;
            }
            if (!string.IsNullOrWhiteSpace(request.Password))
            {
                user.PasswordHash = request.Password; // en produccion, hashear
            }

            user.UpdatedAt = DateTime.UtcNow;
            _context.SaveChanges();

            return Ok(new { message = "usuario actualizado correctamente" });
        }

        /// <summary>
        /// elimina un usuario por su id
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            // busca usuario
            var user = _context.Users.SingleOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "usuario no encontrado" });
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok(new { message = "usuario eliminado correctamente" });
        }
    
        // compara password recibido con el hash almacenado 
        private bool VerifyPassword(string inputPassword, string storedPasswordHash)
        {
            return inputPassword == storedPasswordHash;
        }
    }
}
