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


        public class DenunciaRet
        {
            Denuncia denuncia;
            string userName;
            string status;
            string tipo;
            int likesCount;

            public DenunciaRet(Denuncia denuncia, string userName, string status, string tipo, int likesCount)
            {
                this.denuncia = denuncia;
                this.userName = userName;
                this.status = status;
                this.tipo = tipo;
                this.likesCount = likesCount;
            }
        }

        [HttpGet]
        public ActionResult<List<DenunciaRet>> GetAll()
        {
            List<DenunciaRet> retorno = new List<DenunciaRet>();
            var denuncias = this._context.Denuncia.ToList();
            if (denuncias == null)
                return NotFound();
            foreach (Denuncia denuncia in denuncias)
            {
                var usuario = this._context.Usuario.Find(denuncia.IdUsuario);
                var status = this._context.StatusDenuncia.Find(denuncia.IdStatusDenuncia);
                var tipo = this._context.TipoDenuncia.Find(denuncia.IdTipoDenuncia);
                var opinioes = this._context.Opiniao.ToList();
                int curtidas = 0;
                foreach (Opiniao op in opinioes)
                    if (op.IdUsuario == denuncia.IdUsuario && op.IdDenuncia == denuncia.IdDenuncia)
                        curtidas++;

                DenunciaRet ret = new DenunciaRet(denuncia, usuario.Nome, status.Status, tipo.Tipo, curtidas);
                retorno.Add(ret);
            }

            return retorno;
        }

        [HttpGet("{idDenuncia}")]
        public ActionResult<DenunciaRet> GetDenuncia(int idDenuncia)
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

        [HttpGet("{cpf}")]
        public ActionResult<List<Denuncia>> GetDenunciasUsuario(string cpf)
        {
            List<Denuncia> retorno = new List<Denuncia>();
            var denuncias = _context.Denuncia.ToList();
            foreach (Denuncia denuncia in denuncias)
            {
                if (denuncia.IdUsuario == cpf)
                    retorno.Add(denuncia);
            }
            return retorno;
        }

        [HttpGet("{idTipo}")]
        public ActionResult<List<Denuncia>> GetDenunciasTipo(int idTipo)
        {
            List<Denuncia> retorno = new List<Denuncia>();
            var denuncias = _context.Denuncia.ToList();
            foreach (Denuncia denuncia in denuncias)
            {
                if (denuncia.IdTipoDenuncia == idTipo)
                    retorno.Add(denuncia);
            }
            return retorno;
        }

        [HttpGet("{idStatus}")]
        public ActionResult<List<Denuncia>> GetDenunciasStatus(int idStatus)
        {
            List<Denuncia> retorno = new List<Denuncia>();
            var denuncias = _context.Denuncia.ToList();
            foreach (Denuncia denuncia in denuncias)
            {
                if (denuncia.IdStatusDenuncia == idStatus)
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
            catch (Exception ex)
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
                resultado.IdTipoDenuncia = denuncia.IdTipoDenuncia;
                resultado.IdStatusDenuncia = denuncia.IdStatusDenuncia;
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
    }
}