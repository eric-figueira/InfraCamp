using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameWorkCore;
using backend.Models;

namespace backend.Data
{
    public class InfraCampContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public InfraCampContext(IConfiguration configuration) {
            this.Configuration = configuration;
        }

        protected override OnConfiguring(DbContextOptionsBuilder options) 
        {
            options.useSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        public DbSet<Atualizacao>? Atualizacao { get; set; }
        public DbSet<Denuncia>? Denuncia { get; set; }
        public DbSet<Opiniao>? Opiniao { get; set; }
        public DbSet<StatusDenuncia>? StatusDenuncia { get; set; }
        public DbSet<TipoDenuncia>? TipoDenuncia { get; set; }
        public DbSet<Usuario>? Usuario { get; set; }
    }
}