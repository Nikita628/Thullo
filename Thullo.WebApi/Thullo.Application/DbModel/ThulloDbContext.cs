using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Thullo.Application.Services;

namespace Thullo.Application.DbModel
{
	public class ThulloDbContext : IdentityDbContext<User, IdentityRole<int>, int>
	{
		private readonly CurrentUserAccessor _userAccessor;

		#region PM console requires
		public ThulloDbContext()
		{

		}

		protected override void OnConfiguring(DbContextOptionsBuilder options)
		{
			if (!options.IsConfigured)
			{
				options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Thullo;Trusted_Connection=True;");
			}
		}
		#endregion

		public ThulloDbContext(DbContextOptions<ThulloDbContext> options, CurrentUserAccessor cua)
			: base(options)
		{
			_userAccessor = cua;
		}

		public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
		{
			var entries = ChangeTracker
				.Entries()
				.Where(e => e.Entity is AuditEntity && (e.State == EntityState.Added || e.State == EntityState.Modified));

			foreach (var entityEntry in entries)
			{
				var auditEntity = (AuditEntity)entityEntry.Entity;

				if (entityEntry.State == EntityState.Modified)
				{
					if (!auditEntity.UpdatedDate.HasValue)
						auditEntity.UpdatedDate = DateTime.UtcNow;

					if (_userAccessor != null && !auditEntity.UpdatedById.HasValue)
						auditEntity.UpdatedById = _userAccessor.CurrentUserId;
				}
				else if (entityEntry.State == EntityState.Added)
				{
					if (auditEntity.CreatedDate == default)
						auditEntity.CreatedDate = DateTime.UtcNow;

					if (_userAccessor != null && auditEntity.CreatedById == default)
						auditEntity.CreatedById = _userAccessor.CurrentUserId;
				}
			}

			return base.SaveChangesAsync(cancellationToken);
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// good practice is to Restrict cascading deletion (to preserve data integrity)
			// delete related entities from code, if needed

			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<BoardMembership>()
				.HasKey(bm => new { bm.UserId, bm.BoardId });

			modelBuilder.Entity<CardMembership>()
				.HasKey(cm => new { cm.UserId, cm.CardId });

			modelBuilder.Entity<LabelToCardRelation>()
				.HasKey(lc => new { lc.CardId, lc.CardLabelId });
			modelBuilder.Entity<LabelToCardRelation>()
				.HasOne(lc => lc.Card)
				.WithMany(c => c.LabelToCardRelations)
				.HasForeignKey(lc => lc.CardId)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Board>()
				.Property(b => b.Title).IsRequired().HasMaxLength(100);
			modelBuilder.Entity<Board>()
				.HasIndex(b => b.Title);
			modelBuilder.Entity<Board>()
				.HasOne(b => b.CreatedBy)
				.WithMany(u => u.Boards)
				.HasForeignKey(b => b.CreatedById)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<BoardList>()
				.Property(bl => bl.Title).IsRequired().HasMaxLength(100);
			modelBuilder.Entity<BoardList>()
				.HasOne(bl => bl.CreatedBy)
				.WithMany(u => u.BoardLists)
				.HasForeignKey(bl => bl.CreatedById)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Card>()
				.Property(c => c.Title).IsRequired().HasMaxLength(100);
			modelBuilder.Entity<Card>()
				.HasOne(c => c.CreatedBy)
				.WithMany(u => u.Cards)
				.HasForeignKey(c => c.CreatedById)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<CardAttachment>()
				.HasOne(ca => ca.CreatedBy)
				.WithMany(u => u.CardAttachments)
				.HasForeignKey(ca => ca.CreatedById)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<CardComment>()
				.Property(cc => cc.Text).IsRequired();
			modelBuilder.Entity<CardComment>()
				.HasOne(cc => cc.CreatedBy)
				.WithMany(u => u.CardComments)
				.HasForeignKey(cc => cc.CreatedById)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<CardLabel>()
				.Property(ca => ca.Name).IsRequired().HasMaxLength(100);
			modelBuilder.Entity<CardLabel>()
				.Property(ca => ca.Color).IsRequired().HasMaxLength(100);
			modelBuilder.Entity<CardLabel>()
				.HasOne(cl => cl.CreatedBy)
				.WithMany(u => u.CardLabels)
				.HasForeignKey(cl => cl.CreatedById)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<User>()
				.Property(u => u.FirstName).IsRequired().HasMaxLength(100);
			modelBuilder.Entity<User>()
				.Property(u => u.LastName).IsRequired().HasMaxLength(100);

			modelBuilder.Entity<File>()
				.Property(f => f.Name).IsRequired().HasMaxLength(1000);
			modelBuilder.Entity<File>()
				.Property(f => f.Url).IsRequired();
		}

		public DbSet<User> User { get; set; }
		public DbSet<Board> Boards { get; set; }
		public DbSet<BoardList> BoardLists { get; set; }
		public DbSet<BoardMembership> BoardMemberships { get; set; }
		public DbSet<Card> Cards { get; set; }
		public DbSet<CardAttachment> CardAttachments { get; set; }
		public DbSet<CardComment> CardComments { get; set; }
		public DbSet<CardLabel> CardLabels { get; set; }
		public DbSet<CardMembership> CardMemberships { get; set; }
		public DbSet<LabelToCardRelation> LabelToCardRelations { get; set; }
		public DbSet<File> Files { get; set; }
	}
}
