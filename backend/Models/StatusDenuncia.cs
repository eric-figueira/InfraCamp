using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class StatusDenuncia
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int IdStatus { get; set; }
        
        [StringLength(30)]
        public string? Status { get; set; }

        // Coleções para indicar tabelas dependentes
        public virtual ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();
    }
}