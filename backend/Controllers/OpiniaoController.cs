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

        // chave primária composta
        [HttpGet("{idDenuncia}/{idUsuario}", Name = "GetUserPermissionByID")]
        public ActionResult<Opiniao> GetOpiniao(int idDenuncia, string idUsuario)
        {
            try
            {
                var result = this._context.Opiniao.Find(idDenuncia, idUsuario);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch (Exception erro)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}