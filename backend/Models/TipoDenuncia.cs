using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class TipoDenuncia
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int IdTipo { get; set; }
        
        [StringLength(30)]
        public string? Tipo { get; set; }
        public virtual ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();
    }
}