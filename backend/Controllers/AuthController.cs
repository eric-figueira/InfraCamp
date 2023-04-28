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

    public Object gerarTokenData(string token, Usuario u) 
    {
      var response = new
      {
        // token aleatorio apenas para testes
        token = token,
        user = new
        {
          nome = u!.Nome,
          email = u!.Email,
          avartar_url = u!.UrlImagem,
          telefone = u!.Telefone,
          funcionario = u!.IsFunc
        }
      };

      string jsonData = JsonConvert.SerializeObject(response);

      return jsonData;
    }

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
        return gerarTokenData("0d45cecd-f588-4007-a411-4298f6f4d5cc", usuario);
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }

    public class DadosLogar
    {
      public string CPF { get; set; }
      public string NovaSenha { get; set; }
    }
    [HttpPost("/logar&return_token_data")]
    public ActionResult<Object> Logar(DadosLogar data)
    {
      try
      {
        // Verificar se dados (email + novaSenha em obj) existem
        ActionResult<Usuario> result;

        UsuarioController uc = new UsuarioController(this._context);
        result = uc.GetUsuario(data.CPF);

        if (result.GetType().Equals(NotFound())) return NotFound();

        Usuario usuario = (Usuario)((OkObjectResult) result.Result).Value;

        // Gerar token com os dados de usuário
        return gerarTokenDataData("0d45cecd-f588-4007-a411-4298f6f4d5cc", usuario);
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }

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
        return gerarTokenData("0d45cecd-f588-4007-a411-4298f6f4d5cc", usuario);
      }
      catch
      {
        // Mudar o codigo
        return this.StatusCode(StatusCodes.Status400BadRequest, "Dados inválidos!");
      }
    }
  }
}