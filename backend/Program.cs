using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

//Allow CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

// Add CORS
builder.Services.AddCors(options =>
{
  options.AddPolicy(MyAllowSpecificOrigins, builder =>
  {
    builder.WithOrigins("http://localhost").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
    builder.SetIsOriginAllowed(origin => true);
  });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add authorization services
builder.Services.AddAuthorization();
// builder.Services.AddAuthorization("Bearer").AddJwtBearer();


builder.Services.AddDbContext<InfraCampContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("StringConexaoSQLServer"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Allow CORS
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
