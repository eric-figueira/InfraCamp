using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Usuario
    {
        public string? Cpf { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public string? Senha { get; set; }
        public string? UrlImagem { get; set; }
        public bool IsFunc { get; set; }

        // Coleções contendo dependentes (foreign key)
        public ICollection<Opiniao> Opinioes { get; } = new List<Opiniao>(); 

        public ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();

        public ICollection<Atualizacao> Atualizacoes { get; } = new List<Atualizacao>();
    }
}