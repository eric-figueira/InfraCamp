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
        public virtual Denuncia Denuncia { get; set; } = null!; // Referência de navegação para a principal
        public string? Cpf { get; set; } // chave estrangeira
        public virtual Usuario Usuario { get; set; } = null!; // referência de navegação para a principal
        
        [DataType(DataType.Date)]
        public DateTime DataOpiniao { get; set; }
        public bool IsCurtida { get; set; }
    }
}