using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text;

using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;


using backend.Data;
using backend.Models;


namespace backend.Controllers
{
  [Route("api/auth")]
  public class AuthController : ControllerBase
  {
    private InfraCampContext _context;
    private IConfiguration _configuration;

    public AuthController(InfraCampContext ctx, IConfiguration config)
    {
      this._context = ctx;
      this._configuration = config;
    }

    [HttpPost("validateToken&returnData")]
    public ActionResult<Object> ValidadeTokenAndReturnData(string Token)
    {
      try
      {
        // Testar se o token não expirou / se é válido
        if (IsJWTEXpired(Token)) return false;

        // Caso seja, ainda precisamos pegar as informacoes do usuario
        var response = new
        {
          isTokenValid = true
        };

        string jsonData = JsonConvert.SerializeObject(response);

        return jsonData;
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Token inválido!");
      }
    }

    [NonAction]
    public bool IsJWTEXpired(string token)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]);
      try
      {
        tokenHandler.ValidateToken(token, new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false,
          ClockSkew = TimeSpan.Zero
        },
        out SecurityToken validatedToken);

        return false;
      }
      catch (SecurityTokenExpiredException)
      {
        return true;
      }
      catch (SecurityTokenException)
      {
        return true;
      }
    }

    [NonAction]
    public Object gerarTokenData(Usuario u)
    {
      var authClaims = new List<Claim> {
          new Claim(ClaimTypes.Name, u.Nome),
          new Claim(ClaimTypes.Email, u.Email),
          new Claim("CPF", u.Cpf),
          new Claim("isFuncionario", u.IsFunc.ToString()),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

      var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

      var token = new JwtSecurityToken(
        expires: DateTime.Now.AddMonths(1),
        issuer: _configuration["JWT:ValidIssuer"],
        audience: _configuration["JWT:ValidAudience"],
        claims: authClaims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
      );

      var response = new
      {
        token = token,
        user = new
        {
          nome = u!.Nome,
          email = u!.Email,
          avatar_url = u!.UrlImagem,
          telefone = u!.Telefone,
          funcionario = u!.IsFunc,
          cpf = u!.Cpf
        }
      };

      string jsonData = JsonConvert.SerializeObject(response);

      return jsonData;
    }

    [HttpPost("cadastrar&returnTokenData")]
    public async Task<ActionResult<Object>> Cadastrar(string CPF, string Email, string Nome, string Telefone, string Senha)
    {
      try
      {
        // Verificar se CPF já existe no banco
        ActionResult<Usuario> result;

        UsuarioController uc = new UsuarioController(this._context);
        result = uc.GetUsuario(CPF);

        // Retornamos BadRequest caso não retorne NotFound, pois se isso acontecer
        // significa que já existe esse CPF cadastrado
        if (result != null) return BadRequest();

        Usuario usuario = new Usuario();
        usuario.Cpf = CPF;
        usuario.Nome = Nome;
        usuario.Email = Email;
        usuario.Telefone = Telefone;
        usuario.Senha = Telefone;
        usuario.UrlImagem = "";
        usuario.IsFunc = false;
        await uc.Post(usuario);

        // Gerar token com os dados de usuário
        return gerarTokenData(usuario);
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }


    [HttpPost("logar&returnTokenData")]
    public ActionResult<Object> Logar(string CPF, string Senha)
    {
      try
      {
        // Verificar se dados (email + senha em obj) existem
        ActionResult<Usuario> result;

        UsuarioController uc = new UsuarioController(this._context);
        result = uc.GetUsuario(CPF);

        if (result == null) return Unauthorized();

        Usuario usuario = (Usuario)((OkObjectResult)result.Result).Value;

        // Gerar token com os dados de usuário
        return gerarTokenData(usuario);
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }


    [HttpPost("recuperarSenha&returnTokenData")]
    public async Task<ActionResult<Object>> RecuperarSenha(string CPF, string NovaSenha)
    {
      try
      {
        // Verificar se dados (email + novaSenha em obj) existem
        ActionResult<Usuario> result;

        UsuarioController uc = new UsuarioController(this._context);
        result = uc.GetUsuario(CPF);

        if (result == null) return Unauthorized();

        Usuario usuario = (Usuario)((OkObjectResult)result.Result).Value;
        // Update no banco
        usuario!.Senha = NovaSenha;
        await uc.Put(usuario);

        // Gerar token com os dados de usuário
        return gerarTokenData(usuario);
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }

    [HttpGet]
    [Route("anonymous")]
    [AllowAnonymous]
    public string Anonymous() => "Anônimo";

    [HttpGet]
    [Route("authenticated")]
    [Authorize]
    public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

    [HttpGet]
    [Route("usuario")]
    [Authorize(Roles = "0")]
    public string Cidadao() => "Cidadão";

    [HttpGet]
    [Route("funcionario")]
    [Authorize(Roles = "1")]
    public string Funcionario() => "Funcionário";
  }
}