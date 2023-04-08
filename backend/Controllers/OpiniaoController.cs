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
    [Route("[controller]")]
    public class OpiniaoController : Controller
    {
        private InfraCampContext _context;
        public OpiniaoController(InfraCampContext ctx) {
            this._context = ctx;
        }
    }
}