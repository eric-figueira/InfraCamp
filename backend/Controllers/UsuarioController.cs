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
    [Route("api/usuarios")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private InfraCampContext _context;
        public UsuarioController(InfraCampContext ctx) {
            this._context = ctx;
        }
    }
}