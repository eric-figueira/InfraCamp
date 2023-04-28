using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [PrimaryKey(nameof(IdDenuncia), nameof(Cpf), nameof(IdStatus))]
    public class Atualizacao
    {
        public int IdDenuncia { get; set; }
        public virtual Denuncia? Denuncia { get; set; }
        
        [Required]
        [StringLength(14, MinimumLength = 14)]
        [Display(Name = "CPF")]
        public string? Cpf { get; set; }
        public virtual Usuario Usuario { get; set; } = null!;
        public int IdStatus { get; set; }
        public virtual StatusDenuncia? StatusDenuncia { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [Display(Name = "Data Atualização")]
        public DateTime DataAtualizacao { get; set; }
        [Display(Name = "Comentário")]
        public string? Comentario { get; set; }
    }
}