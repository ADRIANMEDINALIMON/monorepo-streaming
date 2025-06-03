using api_streaming.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.IO;
using System;

var builder = WebApplication.CreateBuilder(args);

// registra dbcontext y controladores
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddControllers();

// swagger para documentar la api
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // opcional: incluir comentarios XML si los generas en tu .csproj
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        options.IncludeXmlComments(xmlPath);
    }
    options.SwaggerDoc("v1", new() 
    { 
        Title = "API Streaming", 
        Version = "v1",
        Description = "api para autenticacion y manejo de usuarios" 
    });
});

// habilita cors para peticiones desde cualquier origen
builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()
    )
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Streaming v1");
        c.RoutePrefix = string.Empty; //http://localhost:5162/
    });
}

// aplica cors y redireccion https
app.UseCors();
app.UseHttpsRedirection();

// mapea rutas de controladores
app.MapControllers();

app.Run();
