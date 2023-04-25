using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class StatusDenuncia
    {
        [Key]
        public int IdStatus { get; set; }
        public string? Status { get; set; }

        // Coleções para indicar tabelas dependentes
        public ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();
        public ICollection<Atualizacao> Atualizacoes { get; } = new List<Atualizacao>();
    }
}