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
    [Route("api/tiposDenuncia")]
    [ApiController]
    public class TipoDenunciaController : ControllerBase
    {
        private InfraCampContext _context;
        public TipoDenunciaController(InfraCampContext ctx)
        {
            this._context = ctx;
        }

        /*
            GET de lista dos tipos de denúncia - usos:
                - Filtrar denúncias por tipo
                - Criar uma denúncia
            
            Obs: Não precisa de PUT, POST ou DELETE
        */
        [HttpGet]
        public ActionResult<List<TipoDenuncia>> GetAll()
        {
            return this._context.TipoDenuncia.ToList();
        }

        [HttpGet("{idTipo}")]
        public ActionResult<TipoDenuncia> GetTipoDenuncia(int idTipo)
        {
            try
            {
                var resultado = _context.TipoDenuncia.Find(idTipo);
                if (resultado == null)
                    return NotFound();
                return Ok(resultado);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}