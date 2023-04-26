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
        public virtual Denuncia Denuncia { get; set; } = null!;
        public int Cpf { get; set; }
        public virtual Usuario Usuario { get; set; } = null!;
        public int IdStatus { get; set; }
        public virtual StatusDenuncia StatusDenuncia { get; set; } = null!;

        [DataType(DataType.Date)]
        public DateTime DataAtualizacao { get; set; }
        public string? Comentario { get; set; }
    }
}