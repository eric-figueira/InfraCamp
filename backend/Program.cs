using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;


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

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
// Adding Jwt Bearer
.AddJwtBearer(options =>
{
  options.SaveToken = true;
  options.RequireHttpsMetadata = false;
  options.TokenValidationParameters = new TokenValidationParameters()
  {
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidAudience = configuration["JWT:ValidAudience"],
    ValidIssuer = configuration["JWT:ValidIssuer"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
  };
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

//Allow CORS
app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

//Allow CORS
app.UseCors(MyAllowSpecificOrigins);

// Add Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
