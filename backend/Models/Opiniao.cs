using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{   
    // primary key composta
    [PrimaryKey(nameof(IdDenuncia), nameof(Cpf))]
    public class Opiniao
    {
        public int IdDenuncia { get; set; } // Chave estrangeira
        public virtual Denuncia? Denuncia { get; set; } // Referência de navegação para a principal

        [Required]
        [StringLength(14, MinimumLength = 14)]
        [Display(Name = "CPF")]
        public string? Cpf { get; set; } // chave estrangeira
        public virtual Usuario? Usuario { get; set; } // referência de navegação para a principal
        
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:/dd/MM/yyyy}")]
        public DateTime DataOpiniao { get; set; }
        public bool IsCurtida { get; set; }
    }
}