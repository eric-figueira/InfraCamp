using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using backend.Controllers;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/denuncias")]
    [ApiController]
    public class DenunciaController : ControllerBase
    {
        private InfraCampContext _context;
        public DenunciaController(InfraCampContext ctx)
        {
            this._context = ctx;
        }

        /*
            Precisa de:
                1 - GET de todas as denúncias
                2 - GET de denúncias que o usuário fez
                3 - GET de denúncias com o status passado
                4 - GET de denúncias com o tipo passado
                5 - POST de uma nova denúncia
                6 - DELETE de uma denúncia
                7 - PUT de uma denúncia
        */

        [HttpGet]
        public ActionResult<List<Denuncia>> GetAll()
        {
            return this._context.Denuncia.OrderByDescending(order => order.Opinioes.Count()).ToList();
        }

        [HttpGet("{idDenuncia}")]
        public ActionResult<Denuncia> GetDenuncia(int idDenuncia)
        {
            try
            {
                var retorno = this._context.Denuncia.Find(idDenuncia);
                if (retorno == null)
                    return NotFound();
                return Ok(retorno);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpGet("denunciasUsuario/{cpf}")]
        public ActionResult<List<Denuncia>> GetDenunciasUsuario(string cpf)
        {
            List<Denuncia> retorno = new List<Denuncia>();
            var denuncias = _context.Denuncia.ToList();
            foreach (Denuncia denuncia in denuncias)
            {
                if (denuncia.Cpf == cpf)
                    retorno.Add(denuncia);
            }
            return retorno;
        }

        [HttpGet("denunciasTipo/{idTipo}")]
        public ActionResult<List<Denuncia>> GetDenunciasTipo(int idTipo)
        {
            List<Denuncia> retorno = new List<Denuncia>();
            var denuncias = _context.Denuncia.ToList();
            foreach (Denuncia denuncia in denuncias)
            {
                if (denuncia.IdTipo == idTipo)
                    retorno.Add(denuncia);
            }
            return retorno;
        }

        [HttpGet("denunciasStatus/{idStatus}")]
        public ActionResult<List<Denuncia>> GetDenunciasStatus(int idStatus)
        {
            List<Denuncia> retorno = new List<Denuncia>();
            var denuncias = _context.Denuncia.ToList();
            foreach (Denuncia denuncia in denuncias)
            {
                if (denuncia.IdStatus == idStatus)
                    retorno.Add(denuncia);
            }
            return retorno;
        }

        [HttpPost]
        public async Task<ActionResult<Denuncia>> Post(Denuncia denuncia)
        {
            try
            {
                this._context.Denuncia.Add(denuncia);
                if (await _context.SaveChangesAsync() == 1)
                    return Created("api/denuncias/" + denuncia.IdDenuncia, denuncia);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso no banco de dados.");
            }
            return BadRequest();
        }

        [HttpDelete("{idDenuncia}")]
        public async Task<ActionResult<Denuncia>> Delete(int idDenuncia)
        {
            try
            {
                var resultado = await this._context.Denuncia.FindAsync(idDenuncia);
                if (resultado == null)
                    return NotFound();
                this._context.Denuncia.Remove(resultado);
                await this._context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso ao banco de dados.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<Denuncia>> Put(Denuncia denuncia)
        {
            try
            {
                var resultado = await this._context.Denuncia.FindAsync(denuncia.IdDenuncia);
                if (resultado == null)
                    return NotFound();

                resultado.Latitude = denuncia.Latitude;
                resultado.Longitude = denuncia.Longitude;
                resultado.Endereco = denuncia.Endereco;
                resultado.IdTipo = denuncia.IdTipo;
                resultado.IdStatus = denuncia.IdStatus;
                resultado.UrlImagem = denuncia.UrlImagem;
                resultado.Descricao = denuncia.Descricao;
                resultado.DataDenuncia = denuncia.DataDenuncia;

                await this._context.SaveChangesAsync();
                return Created("api/denuncias/" + denuncia.IdDenuncia, denuncia);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Falha no acesso aos dados.");
            }
        }

        [HttpPut("atualizaStatus/{idDenuncia}/{idNovoStatus}")]
        public async Task<ActionResult> PutStatusDenuncia(int idDenuncia, int idNovoStatus) 
        {
            try 
            {
                var resultado = await this._context.Denuncia.FindAsync(idDenuncia);
                if (resultado == null)
                    return NotFound();

                resultado.IdStatus = idNovoStatus;

                await this._context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso ao banco de dados.");
            }
        }
    }
}