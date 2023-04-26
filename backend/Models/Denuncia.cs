using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Denuncia
    {
        [Key]
        public int IdDenuncia { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? Endereco { get; set; }
        public int IdTipo { get; set; }
        public virtual TipoDenuncia TipoDenuncia { get; set; } = null!;
        public int IdStatus { get; set; }
        public virtual StatusDenuncia StatusDenuncia { get; set; } = null!;
        public string? UrlImagem { get; set; }
        public string? Descricao { get; set; }
        public string? Cpf { get; set; }
        public virtual Usuario Usuario { get; set; } = null!;

        [DataType(DataType.Date)]
        public DateTime DataDenuncia { get; set; }

        // Coleções que agrupam tabelas dependentes (foreign key)
        public virtual ICollection<Atualizacao> Atualizacoes { get; } = new List<Atualizacao>();

        public virtual ICollection<Opiniao> Opinioes { get; } = new List<Opiniao>();
    }
}