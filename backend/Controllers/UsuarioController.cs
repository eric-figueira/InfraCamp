using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/usuarios")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private InfraCampContext _context;
        public UsuarioController(InfraCampContext ctx)
        {
            this._context = ctx;
        }

        [HttpGet]
        public ActionResult<List<Usuario>> GetAll()
        {
            return this._context.Usuario.ToList();
        }

        [HttpGet("{cpf}")]
        public ActionResult<Usuario> GetUsuario(string cpf)
        {
            try
            {
                var resultado = this._context.Usuario.Find(cpf);
                if (resultado == null)
                    return NotFound();
                return Ok(resultado);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso no banco de dados.");
            }
        }

        [HttpGet("/getUsuarioEmail/{email}")]
        public ActionResult<Usuario> GetUsuarioEmail(string email)
        {
            try
            {
                var resultado = this._context.Usuario.Find(email);
                if (resultado == null)
                    return NotFound();
                return Ok(resultado);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso no banco de dados.");
            }
        }

        [HttpPut("ban")]
        public async Task<ActionResult<Usuario>> Banir(string cpf, bool isBanido)
        {
            try
            {
                var resultado = this._context.Usuario.Find(cpf);
                if (resultado == null)
                    return NotFound();
                resultado.IsBanido = isBanido; 
                await this._context.SaveChangesAsync();
                return Created("api/usuarios/" + resultado.Cpf, resultado);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso no banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> Post(Usuario usuario)
        {
            try
            {
                this._context.Usuario.Add(usuario);
                if (await _context.SaveChangesAsync() == 1)
                    return Created("api/usuarios/" + usuario.Cpf, usuario);
            }
            catch 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso no banco de dados.");
            }
            return BadRequest();
        }

        [HttpDelete("{cpf}")]
        public async Task<ActionResult<Usuario>> Delete(string cpf)
        {
            try
            {
                var resultado = await this._context.Usuario.FindAsync(cpf);
                if (resultado == null)
                    return NotFound();
                this._context.Usuario.Remove(resultado);
                await this._context.SaveChangesAsync();
                return NoContent();
            }
            catch 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso ao banco de dados.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<Usuario>> Put(Usuario usuario)
        {
            try
            {
                var resultado = await this._context.Usuario.FindAsync(usuario.Cpf);
                if (resultado == null)
                    return NotFound();

                resultado.Nome = usuario.Nome;
                resultado.Email = usuario.Email;
                resultado.Telefone = usuario.Telefone;
                resultado.Senha = usuario.Senha;
                resultado.UrlImagem = usuario.UrlImagem;
                resultado.IsFunc = usuario.IsFunc;
                resultado.IsBanido = usuario.IsBanido;

                await this._context.SaveChangesAsync();
                return Created("api/usuarios/" + usuario.Cpf, usuario);
            }
            catch 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Falha no acesso aos dados.");
            }
        }
    }
}