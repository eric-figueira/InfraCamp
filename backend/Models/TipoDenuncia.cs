using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class TipoDenuncia
    {
        [Key]
        public int IdTipo { get; set; }
        public string? Tipo { get; set; }
        public virtual ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();
    }
}