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
    public class AtualizacaoController : Controller
    {
        private InfraCampContext _context;
        public AtualizacaoController(InfraCampContext ctx) {
            this._context = ctx;
        }
    }
}