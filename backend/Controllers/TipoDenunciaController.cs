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
    public class TipoDenunciaController : Controller
    {
        private InfraCampContext _context;
        public AtualizacaoController(InfraCampContext ctx) {
            this._context = ctx;
        }
    }
}