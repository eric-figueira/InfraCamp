using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{   
    // primary key composta
    [PrimaryKey(nameof(IdDenuncia), nameof(IdUsuario))]
    public class Opiniao
    {
        public int IdDenuncia { get; set; } // Chave estrangeira
        public Denuncia Denuncia { get; set; } = null!; // Referência de navegação para a principal
        public string? IdUsuario { get; set; } // chave estrangeira
        public Usuario Usuario { get; set; } = null!; // referência de navegação para a principal
        
        [DataType(DataType.Date)]
        public DateTime DataInteracao { get; set; }
        public bool IsCurtida { get; set; }
    }
}