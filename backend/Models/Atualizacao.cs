using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [PrimaryKey(nameof(IdDenuncia), nameof(IdUsuario), nameof(IdStatusDenuncia))]
    public class Atualizacao
    {
        public int IdDenuncia { get; set; }
        public Denuncia Denuncia { get; set; } = null!;
        public int IdUsuario { get; set; }
        public Usuario Usuario { get; set; } = null!;
        public int IdStatusDenuncia { get; set; }
        public StatusDenuncia StatusDenuncia { get; set; } = null!;
       
        [DataType(DataType.Date)]
        public DateTime DataAtualizacao { get; set; }
        public string? Comentario { get; set; }
    }
}