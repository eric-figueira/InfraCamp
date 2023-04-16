using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokems;
using Microsoft.IdentityModel.Tokens.Jwt;


namespace backend.Controllers
{
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
         var tokenHandler = new JwtSecurityTokenHandler();
    }
}