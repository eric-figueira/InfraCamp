using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class StatusDenuncia
    {
        enum Status : String {
            NaoVisualizado = "Não Visulizado", 
            EmAnalise = "Em análise",
            Fechado = "Fechado",
            EmProcessoDeResolucao = "Em processo de resolução",
            Resolvido = "Resolvido"
        }
        public int IdStatus { get; set; }
        public Status Status { get; set; }
    }
}