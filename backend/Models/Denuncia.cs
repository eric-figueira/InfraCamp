using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Denuncia
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int IdDenuncia { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        [Required]
        [Display(Name = "Endereço")]
        public string? Endereco { get; set; }
        public int IdTipo { get; set; }
        public virtual TipoDenuncia? TipoDenuncia { get; set; }
        public int IdStatus { get; set; }
        public virtual StatusDenuncia? StatusDenuncia { get; set; }

        [DataType(DataType.ImageUrl)]
        public string? UrlImagem { get; set; }

        [Required]
        [StringLength(150)]
        [Display(Name = "Descrição")]
        public string? Descricao { get; set; }

        [Required]
        [StringLength(14, MinimumLength = 14)]
        [Display(Name = "CPF")]
        public string? Cpf { get; set; }
        public virtual Usuario? Usuario { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:/dd/MM/yyyy}")]
        [Display(Name = "Data Denúncia")]
        public DateTime DataDenuncia { get; set; }

        // Coleções que agrupam tabelas dependentes (foreign key)
        public virtual ICollection<Atualizacao> Atualizacoes { get; } = new List<Atualizacao>();
        public virtual ICollection<Opiniao> Opinioes { get; } = new List<Opiniao>();
    }
}