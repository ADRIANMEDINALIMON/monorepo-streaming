using api_streaming.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// registra dbcontext y controladores
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddControllers();

// habilita cors para peticiones desde cualquier origen
builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()
    )
);

var app = builder.Build();

// aplica cors y redireccion https
app.UseCors();
app.UseHttpsRedirection();

// mapea rutas de controladores
app.MapControllers();

app.Run();
