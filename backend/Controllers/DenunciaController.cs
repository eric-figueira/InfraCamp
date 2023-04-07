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
    [Route("api/denuncias")]
    [ApiController]
    public class DenunciaController : ControllerBase
    {
        private InfraCampContext _context;
        public DenunciaController(InfraCampContext ctx) {
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
        public ActionResult<List<Denuncia>> GetAll() {
            return this._context.Denuncia.ToList();
        }

        [HttpGet("/cpf")]
        public ActionResult<List<Denuncia>> GetDenunciasUsuario(String cpf) {
            // ? 
        }
    }
}