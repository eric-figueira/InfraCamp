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
    [Route("api/opinioes")]
    public class OpiniaoController : Controller
    {
        private InfraCampContext _context;
        public OpiniaoController(InfraCampContext ctx)
        {
            this._context = ctx;
        }

        [HttpGet]
        public ActionResult<List<Opiniao>> GetAll()
        {
            return this._context.Opiniao.ToList();
        }

        [HttpGet("{idDenuncia}")]
        public ActionResult<List<Opiniao>> GetOpinioesDenuncia(int idDenuncia)
        {
            List<Opiniao> lista = this._context.Opiniao.ToList();
            List<Opiniao> retorno = new List<Opiniao>();
            foreach (Opiniao item in lista)
            {
                if (item.IdDenuncia == idDenuncia)
                    retorno.Add(item);
            }
            return retorno;
        }

        // chave primária composta
        [HttpGet("{idDenuncia}/{idUsuario}")]
        public ActionResult<Opiniao> GetOpiniao(int idDenuncia, string idUsuario)
        {
            try
            {
                var result = this._context.Opiniao.Find(idDenuncia, idUsuario);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Opiniao>> Post(Opiniao opiniao)
        {
            try
            {
                _context.Opiniao.Add(opiniao);
                if (await _context.SaveChangesAsync() == 1)
                    return Created($"api/opinioes/{opiniao.IdDenuncia}/{opiniao.IdUsuario}/", opiniao);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
        }

        [HttpDelete("{idDenuncia}/{idUsuario}")]
        public async Task<ActionResult<Opiniao>> Delete(int idDenuncia, int idUsuario)
        {
            try
            {
                var resultado = await _context.Opiniao.FindAsync(idDenuncia, idUsuario);
                if (resultado == null)
                    return NotFound();

                _context.Opiniao.Remove(resultado);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<Opiniao>> Put(Opiniao opiniao)
        {
            try
            {
                var resultado = await _context.Opiniao.FindAsync(opiniao.IdDenuncia, opiniao.IdUsuario);
                if (resultado == null)
                    return NotFound();

                resultado.DataInteracao = opiniao.DataInteracao;
                resultado.IsCurtida = opiniao.IsCurtida;

                await _context.SaveChangesAsync();
                return Created($"api/opinioes/{opiniao.IdDenuncia}/{opiniao.IdUsuario}/", opiniao);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}