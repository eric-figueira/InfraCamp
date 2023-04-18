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
        [HttpGet("/token/{email}/{password}")]
        public String GetAuthenticationToken (string email, string password) 
        {
            try {
                // Verificar se dados existem na tabela
                // Gerar token
                // token aleatorio apenas para testes
                return "0d45cecd-f588-4007-a411-4298f6f4d5cc";
            }
            catch {
                // Mudar o codigo
                return this.StatusCode(StatusCodes.Status400InternalServerError, "Dados inválidos!");
            }
        }
    }
}