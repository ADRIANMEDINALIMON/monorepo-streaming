using api_streaming.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agrega servicios de controladores
builder.Services.AddControllers();

// Configura DbContext (cambia la cadena de conexión si es necesario)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// (Opcional) Configura CORS para permitir peticiones de Angular
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

var app = builder.Build();

app.UseCors();
app.UseHttpsRedirection();

// Mapea los controladores
app.MapControllers();

app.Run();
