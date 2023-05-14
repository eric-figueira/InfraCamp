using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Usuario
    {
        [Key]
        [Required]
        [StringLength(14, MinimumLength = 14)]
        [Display(Name = "CPF")]
        public string? Cpf { get; set; }

        [Required]
        [StringLength(30)]
        public string? Nome { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        [StringLength(20)]
        public string? Telefone { get; set; }
        
        [Required]
        [StringLength(72)]
        [DataType(DataType.Password)]
        public string? Senha { get; set; }
        
        [DataType(DataType.ImageUrl)]
        public string? UrlImagem { get; set; }
        public bool IsFunc { get; set; }

        // Coleções contendo dependentes (foreign key)
        public virtual ICollection<Opiniao> Opinioes { get; } = new List<Opiniao>(); 

        public virtual ICollection<Denuncia> Denuncias { get; } = new List<Denuncia>();

        public virtual ICollection<Atualizacao> Atualizacoes { get; } = new List<Atualizacao>();
    }
}