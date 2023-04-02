using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Opiniao
    {
        public int IdDenuncia { get; set; }
        public string IdUsuario { get; set => value.Substring(0, 14); }
        [DataType(DataType.Date)]
        public DateTime DataInteracao { get; set; }
        public Byte IsCurtida { get; set; }
    }
}