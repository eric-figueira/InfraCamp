using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class TipoDenuncia
    {
        public int IdTipo { get; set; }
        public string? Tipo { get; set; }
        public ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();
    }
}