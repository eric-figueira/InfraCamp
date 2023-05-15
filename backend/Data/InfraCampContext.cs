using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using backend.Models;

namespace backend.Data
{
    public class InfraCampContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public InfraCampContext(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.Opinioes)
                .WithOne(e => e.Usuario)
                .HasForeignKey(e => e.Cpf)
                .HasPrincipalKey(e => e.Cpf)
                .IsRequired();
                
            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.Denuncias)
                .WithOne(e => e.Usuario)
                .HasForeignKey(e => e.Cpf)
                .HasPrincipalKey(e => e.Cpf)
                .IsRequired();

            modelBuilder.Entity<TipoDenuncia>()
                .HasMany(e => e.Denuncias)
                .WithOne(e => e.TipoDenuncia)
                .HasForeignKey(e => e.IdTipo)
                .HasPrincipalKey(e => e.IdTipo)
                .IsRequired();

            modelBuilder.Entity<StatusDenuncia>()
                .HasMany(e => e.Denuncias)
                .WithOne(e => e.StatusDenuncia)
                .HasForeignKey(e => e.IdStatus)
                .HasPrincipalKey(e => e.IdStatus)
                .IsRequired();

            modelBuilder.HasDefaultSchema("InfraCamp");    
        }

        public DbSet<Denuncia> Denuncia { get; set; }
        public DbSet<Opiniao> Opiniao { get; set; }
        public DbSet<StatusDenuncia> StatusDenuncia { get; set; }
        public DbSet<TipoDenuncia> TipoDenuncia { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
    }
}