using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.IdentityModel.Tokens.Jwt;

using backend.Data;
using backend.Models;
using Newtonsoft.Json;

namespace backend.Controllers
{
  [Route("api/auth")]
  public class AuthController : ControllerBase
  {
    private InfraCampContext _context;
    public AuthController(InfraCampContext ctx)
    {
      this._context = ctx;
    }


    // Método de base, nao vai ter no final
    // [HttpPost("/token")]
    // public ActionResult<String> GetAuthenticationToken(string email, string password)
    // {
    //   try
    //   {
    //     // Verificar se dados existem na tabela
    //     Usuario user = null;

    //     foreach (var usuario in this._context.Usuario.ToList())
    //       if (usuario.Email == email)
    //         user = usuario;


    //     // Gerar token
    //     var response = new
    //     {
    //       // token aleatorio apenas para testes
    //       token = "0d45cecd-f588-4007-a411-4298f6f4d5cc",
    //       user = new
    //       {
    //         nome = user.Nome,
    //         email = user.Email,
    //         avartar_url = user.UrlImagem,
    //         telefone = user.Telefone,
    //         funcionario = user.IsFunc
    //       }
    //     };

    //     string jsonData = JsonConvert.SerializeObject(response);

    //     return jsonData;
    //   }
    //   catch
    //   {
    //     // Mudar o codigo
    //     return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
    //   }
    // }

    // [HttpPost("/validate_token&return_data")]
    // public ActionResult<Object> ValidadeTokenAndReturnData(string token)
    // {
    //   try
    //   {
    //     // Testar se o token não expirou / se é válido
    //     // Pegar dados do token
    //     // Mandar dados do usuário
    //   }
    //   catch
    //   {
    //     // Mudar o codigo
    //     return this.StatusCode(StatusCodes.Status400BadRequest, "Token inválido!");
    //   }
    // }

    // [HttpPost("/cadastrar&return_token_data")]
    // public ActionResult<Object> Cadastrar(Object obj)
    // {
    //   try
    //   {
    //     // Adicionar dados no banco
    //     // Gerar jwt
    //     // Mandar obj (token + data)
    //   }
    //   catch
    //   {
    //     // Mudar o codigo
    //     return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
    //   }

    //   UsuarioController u = new UsuarioController(this._context);
    //   u.Post();
    // }

    // [HttpPost("/logar&return_token_data")]
    // public ActionResult<Object> Logar(Object obj)
    // {
    //   try
    //   {
    //     // Verificar se dados (email + senha em obj) existem
    //     // Gerar jwt
    //     // Mandar obj (token + data)s
    //   }
    //   catch
    //   {
    //     // Mudar o codigo
    //     return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
    //   }
    // }

    public class Data1
    {
      public string CPF { get; set; }
      public string NovaSenha { get; set; }
    }

    [HttpPost("/recuperarSenha&return_token_data")]
    public ActionResult<Object> RecuperarSenha(Data1 data)
    {
      try
      {
        // Verificar se dados (email + novaSenha em obj) existem
        ActionResult<Usuario> user;

        UsuarioController uc = new UsuarioController(this._context);
        user = uc.GetUsuario(data.CPF);

        if (user.GetType().Equals(NotFound())) return NotFound();

        // Gerar token
        var response = new
        {
          // token aleatorio apenas para testes
          token = "0d45cecd-f588-4007-a411-4298f6f4d5cc",
          user = new
          {
            nome = user.Value?.Nome,
            email = user.Value?.Email,
            avartar_url = user.Value?.UrlImagem,
            telefone = user.Value?.Telefone,
            funcionario = user.Value?.IsFunc
          }
        };

        string jsonData = JsonConvert.SerializeObject(response);

        return jsonData;
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }
  }
}