using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Opiniao
    {
        [PrimaryKey(nameof(IdDenuncia), nameof(IdUsuario))]
        public int IdDenuncia { get; set; } // Required foreign key property
        public Denuncia Denuncia { get; set; } = null!; // Required reference navigation to principal
        public string IdUsuario { get; set => value.Substring(0, 14); }
        public Usuario Usuario { get; set; } = null!;
        
        [DataType(DataType.Date)]
        public DateTime DataInteracao { get; set; }
        public Byte IsCurtida { get; set; }
    }
}