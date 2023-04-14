using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AtualizacaoController : Controller
    {
        private InfraCampContext _context;
        public AtualizacaoController(InfraCampContext ctx)
        {
            this._context = ctx;
        }

        [HttpGet]
        public ActionResult<List<Atualizacao>> GetAll()
        {
            return this._context.Atualizacao.ToList();
        }

        // composite primary key
        [HttpGet("{idDenuncia}/{idUsuario}/{idStatusDenuncia}")]
        public ActionResult<Atualizacao> GetAtualizacao(int idDenuncia, string idUsuario, int idStatusDenuncia)
        {
            try
            {
                var resultado = _context.Atualizacao.Find(idDenuncia, idUsuario, idStatusDenuncia);
                if (resultado == null)
                    return NotFound();
                return Ok(resultado);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Atualizacao>> Post(Atualizacao atualizacao)
        {
            try
            {
                _context.Atualizacao.Add(atualizacao);
                if (await _context.SaveChangesAsync() == 1)
                {
                    return Created($"api/atualizacoes/{atualizacao.IdDenuncia}/{atualizacao.IdUsuario}/{atualizacao.IdStatusDenuncia}", atualizacao);
                }
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<Atualizacao>> Put(Atualizacao atualizacao)
        {
            try
            {
                var resultado = await _context.Atualizacao.FindAsync(atualizacao.IdDenuncia, atualizacao.IdUsuario, atualizacao.IdStatusDenuncia);
                if (resultado == null)
                    return NotFound();

                resultado.DataAtualizacao = atualizacao.DataAtualizacao;
                resultado.Comentario = atualizacao.Comentario;

                await _context.SaveChangesAsync();
                return Created($"api/atualizacoes/{atualizacao.IdDenuncia}/{atualizacao.IdUsuario}/{atualizacao.IdStatusDenuncia}", atualizacao);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{idDenuncia}/{idUsuario}/{idStatusDenuncia}")]
        public async Task<ActionResult<Atualizacao>> Delete(Atualizacao atualizacao)
        {
            try
            {
                var resultado = await _context.Atualizacao.FindAsync(atualizacao.IdDenuncia, atualizacao.IdUsuario, atualizacao.IdStatusDenuncia);
                if (resultado == null)
                    return NotFound();

                _context.Atualizacao.Remove(resultado);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}