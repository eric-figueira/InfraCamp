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
        private InfraCampContext _context;
        public AuthController(InfraCampContext ctx)
        {
            this._context = ctx;
        }


        [HttpPost("/token")]
        public String GetAuthenticationToken (string email, string password) 
        {
            try {
                // Verificar se dados existem na tabela
                var user;

                foreach (var usuario in this._context.Usuario.ToList()) 
                    if (usuario.Email == email)
                        user = usuario;
                

                // Gerar token
                var response = new
                {
                    // token aleatorio apenas para testes
                    token = "0d45cecd-f588-4007-a411-4298f6f4d5cc",
                    user = new 
                    {
                        nome        = user.Nome,
                        email       = user.Email,
                        avartar_url = user.UrlImagem,
                        telefone    = user.Telefone,
                        funcionario = user.IsFunc
                    }
                };

                string jsonData = JsonConvert.SerializeObject(response);

                return jsonData;
            }
            catch {
                // Mudar o codigo
                return this.StatusCode(StatusCodes.Status400InternalServerError, "Dados inválidos!");
            }
        }
    }

    
}