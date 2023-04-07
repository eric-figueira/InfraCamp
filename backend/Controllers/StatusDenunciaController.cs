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
    [Route("api/statusDenuncia")]
    [ApiController]
    public class StatusDenunciaController : ControllerBase
    {
        private InfraCampContext _context;
        public StatusDenunciaController(InfraCampContext ctx) {
            this._context = ctx;
        }

        /*
            GET de lista dos status possíveis - usos:
                - Filtrar denúncias por status
                - Setar um status para uma denúncia
            
            Obs: Não precisa de PUT, POST ou DELETE. PUT acontecerá na denúncia em si, e não na tabela de StatusDenuncia
        */
        [HttpGet]
        public ActionResult<List<StatusDenuncia>> GetAll() {
            return this._context.StatusDenuncia.ToList();
        }
    }
}