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
    [Route("api/ordensDenuncia")]
    [ApiController]
    public class OrdemDenunciaController : ControllerBase
    {
        private InfraCampContext _context;
        public OrdemDenunciaController(InfraCampContext ctx)
        {
            this._context = ctx;
        }

        /*
            GET de lista das ordenações possíveis - usos:
                - Filtrar denúncias por ordem
            
            Obs: Não precisa de PUT, POST ou DELETE. PUT acontecerá na denúncia em si, e não na tabela de OrdemDenuncia
        */
        [HttpGet]
        public ActionResult<List<OrdemDenuncia>> GetAll()
        {
            return this._context.OrdemDenuncia.ToList();
        }

        [HttpGet("{idOrdem}")]
        public ActionResult<OrdemDenuncia> GetOrdemDenuncia(int idOrdem)
        {
            try
            {
                var resultado = _context.OrdemDenuncia.Find(idOrdem);
                if (resultado == null)
                    return NotFound();
                return Ok(resultado);
            }
            catch 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acesso ao banco de dados.");
            }
        }
    }
}