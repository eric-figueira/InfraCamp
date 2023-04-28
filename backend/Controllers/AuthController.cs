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

    public class DadosCadastrar
    {
      public string CPF { get; set; }
      public string Email { get; set; }
      public string Nome { get; set; }
      public string Telefone { get; set; }
      public string Senha { get; set; }
    }

    [HttpPost("/cadastrar&return_token_data")]
    public async Task<ActionResult<Object>> Cadastrar(DadosCadastrar data)
    {
      try
      {
        // Verificar se CPF já existe no banco
        ActionResult<Usuario> result;

        UsuarioController uc = new UsuarioController(this._context);
        result = uc.GetUsuario(data.CPF);

        // Retornamos BadRequest caso não retorne NotFound, pois se isso acontecer
        // significa que já existe esse CPF cadastrado
        //if (!result.GetType().Equals(NotFound())) return BadRequest();

        Usuario usuario = new Usuario();
        usuario.Cpf = data.CPF;
        usuario.Nome = data.Nome;
        usuario.Email = data.Email;
        usuario.Telefone = data.Telefone;
        usuario.Senha = data.Telefone;
        usuario.UrlImagem = "";
        usuario.IsFunc = false;
        await uc.Post(usuario);

        // Gerar token com os dados de usuário
        var response = new
        {
          // token aleatorio apenas para testes
          token = "0d45cecd-f588-4007-a411-4298f6f4d5cc",
          user = new
          {
            nome = usuario!.Nome,
            email = usuario!.Email,
            avartar_url = usuario!.UrlImagem,
            telefone = usuario!.Telefone,
            funcionario = usuario!.IsFunc
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

    public class DadosRecuperarSenha
    {
      public string CPF { get; set; }
      public string NovaSenha { get; set; }
    }

    [HttpPost("/recuperarSenha&return_token_data")]
    public async Task<ActionResult<Object>> RecuperarSenha(DadosRecuperarSenha data)
    {
      try
      {
        // Verificar se dados (email + novaSenha em obj) existem
        ActionResult<Usuario> result;

        UsuarioController uc = new UsuarioController(this._context);
        result = uc.GetUsuario(data.CPF);

        if (result.GetType().Equals(NotFound())) return NotFound();

        Usuario usuario = (Usuario)((OkObjectResult) result.Result).Value;
        // Update no banco
        usuario!.Senha = data.NovaSenha;
        await uc.Put(usuario);

        // Gerar token com os dados de usuário
        var response = new
        {
          // token aleatorio apenas para testes
          token = "0d45cecd-f588-4007-a411-4298f6f4d5cc",
          user = new
          {
            nome = usuario!.Nome,
            email = usuario!.Email,
            avartar_url = usuario!.UrlImagem,
            telefone = usuario!.Telefone,
            funcionario = usuario!.IsFunc
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