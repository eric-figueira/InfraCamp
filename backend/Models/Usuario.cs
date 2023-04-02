using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Usuario
    {
        public string Cpf { get; set => value.Substring(0, 14); }
        public string Nome { get; set => value.Substring(0, 30); }
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set => value.Substring(0, 100); }
        public string Email { get; set => value.Substring(0, 50); }
        public string Telefone { get; set => value.Substring(0, 20); }
        public string Senha { get; set => value.Substring(0, 30); }
        public string? UrlImagem { get; set; }
        public Byte IsFunc { get; set; }
    }
}