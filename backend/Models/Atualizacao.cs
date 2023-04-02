using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Atualizacao
    {
        public int IdDenuncia { get; set; }
        public int IdUsuario { get; set; }
        public int StatusDenuncia { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataAtualizacao { get; set; }
        public string? Comentario { get; set => value.Substring(0, 14); }
    }
}