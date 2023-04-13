using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class TipoDenuncia
    {
        public int IdTipo { get; set; }
        public string Tipo { get; set => value.Substring(0, 30); }
        public ICollection<Opiniao> Denuncias { get; } = new List<Denuncia>();
    }
}