using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Denuncia
    {
        public int IdDenuncia { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Endereco { get; set; }
        public int TipoDenuncia { get; set; }
        public TipoDenuncia TipoDenuncia { get; set; } = null!;
        public int StatusDenuncia { get; set; }
        public StatusDenuncia StatusDenuncia { get; set; } = null!;
        public string? UrlImagem { get; set; }
        public string? Descricao { get; set => value.Substring(0, 150); }
        public string IdUsuario { get; set => value.Substring(0, 14); }
        public Usuario Usuario { get; set; } = null!;

        [DataType(DataType.Date)]
        public DateTime DataDenuncia { get; set; }
    }
}