using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Thullo.Application.DbModel;

namespace Thullo.WebApi
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var host = CreateHostBuilder(args).Build();

			CreateDbIfNotExists(host);

			host.Run();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
				});

#region seedDb
		private static void CreateDbIfNotExists(IHost host)
		{
			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;

				try
				{
					var context = services.GetRequiredService<ThulloDbContext>();
					var userManager = services.GetRequiredService<UserManager<User>>();

					context.Database.Migrate();
					SeedDb(context, userManager);
				}
				catch (Exception ex)
				{
					var logger = services.GetRequiredService<ILogger<Program>>();
					logger.LogError(ex, "An error occurred creating the DB.");
				}
			}
		}

		class SeedData
		{
			public List<User> Users { get; set; }
			public List<Board> Boards { get; set; }
			public List<BoardList> BoardLists { get; set; }
			public List<Card> Cards { get; set; }
			public List<CardAttachment> CardAttachments { get; set; }
			public List<CardComment> CardComments { get; set; }
			public List<CardLabel> CardLabels { get; set; }
		}

		private static void SeedDb(ThulloDbContext context, UserManager<User> userManager)
		{
			if (context.Users.Any()) return;

			var rand = new Random();

			string fullPath = System.Reflection.Assembly.GetAssembly(typeof(Program)).Location;

			string theDirectory = Path.GetDirectoryName(fullPath);

			string filePath = Path.Combine(theDirectory, "Files", "SeedData.json");

			var seedDataText = System.IO.File.ReadAllText(filePath);
			var seedData = JsonConvert.DeserializeObject<SeedData>(seedDataText);

			foreach (var u in seedData.Users)
			{
				var userImg = new Thullo.Application.DbModel.File
				{
					Name = "defaultUserImg",
					StorageData = "defaultUserImg",
					Url = "https://res.cloudinary.com/df10jbiiq/image/upload/v1581786163/slh8cysyl678asa0fbpd.jpg"
				};
				context.Files.Add(userImg);
				context.SaveChanges();

				u.ImgId = userImg.Id;
				var r = userManager.CreateAsync(u, "password").Result;
			}

			context.SaveChanges();

			foreach (var b in seedData.Boards)
			{
				b.CreatedById = seedData.Users[rand.Next(seedData.Users.Count)].Id;
				b.CreatedDate = DateTime.UtcNow;
				context.Boards.Add(b);
			}

			context.SaveChanges();

			foreach (var bl in seedData.BoardLists)
			{
				bl.CreatedById = seedData.Users[rand.Next(seedData.Users.Count)].Id;
				bl.CreatedDate = DateTime.UtcNow;
				bl.BoardId = seedData.Boards[rand.Next(seedData.Boards.Count)].Id;
				context.BoardLists.Add(bl);
			}

			context.SaveChanges();

			foreach (var c in seedData.Cards)
			{
				c.CreatedById = seedData.Users[rand.Next(seedData.Users.Count)].Id;
				c.CreatedDate = DateTime.UtcNow;
				c.BoardListId = seedData.Boards[rand.Next(seedData.BoardLists.Count)].Id;
				context.Cards.Add(c);
			}

			context.SaveChanges();

			foreach (var ca in seedData.CardAttachments)
			{
				var attachmentFile = new Thullo.Application.DbModel.File
				{
					Name = "attachmentFile",
					StorageData = "attachmentFile",
					Url = "https://res.cloudinary.com/df10jbiiq/image/upload/v1577980297/sample.jpg"
				};
				context.Files.Add(attachmentFile);
				context.SaveChanges();

				ca.CreatedById = seedData.Users[rand.Next(seedData.Users.Count)].Id;
				ca.CreatedDate = DateTime.UtcNow;
				ca.CardId = seedData.Cards[rand.Next(seedData.Cards.Count)].Id;
				ca.FileId = attachmentFile.Id;
				context.CardAttachments.Add(ca);
			}

			context.SaveChanges();

			foreach (var cc in seedData.CardComments)
			{
				cc.CreatedById = seedData.Users[rand.Next(seedData.Users.Count)].Id;
				cc.CreatedDate = DateTime.UtcNow;
				cc.CardId = seedData.Cards[rand.Next(seedData.Cards.Count)].Id;
				context.CardComments.Add(cc);
			}

			context.SaveChanges();

			foreach (var cl in seedData.CardLabels)
			{
				cl.CreatedById = seedData.Users[rand.Next(seedData.Users.Count)].Id;
				cl.CreatedDate = DateTime.UtcNow;
				cl.BoardId = seedData.Boards[rand.Next(seedData.Boards.Count)].Id;
				context.CardLabels.Add(cl);
			}

			context.SaveChanges();

			foreach (var c in seedData.Cards)
			{
				var r = new LabelToCardRelation
				{
					CardId = c.Id,
					CardLabelId = seedData.CardLabels[rand.Next(seedData.CardLabels.Count)].Id
				};
				context.LabelToCardRelations.Add(r);
			}

			context.SaveChanges();

			foreach (var b in seedData.Boards)
			{
				var userIds = new List<int>();

				while (userIds.Count < 3)
				{
					var userId = seedData.Users[rand.Next(seedData.Users.Count)].Id;
					if (userIds.Any(i => i == userId)) continue;
					userIds.Add(userId);
				}

				var bm = new BoardMembership
				{
					BoardId = b.Id,
					UserId = userIds[0]
				};
				var bm2 = new BoardMembership
				{
					BoardId = b.Id,
					UserId = userIds[1]
				};
				var bm3 = new BoardMembership
				{
					BoardId = b.Id,
					UserId = userIds[2]
				};
				context.BoardMemberships.Add(bm);
				context.BoardMemberships.Add(bm2);
				context.BoardMemberships.Add(bm3);
			}

			context.SaveChanges();

			foreach (var c in seedData.Cards)
			{
				var userIds = new List<int>();

				while (userIds.Count < 3)
				{
					var userId = seedData.Users[rand.Next(seedData.Users.Count)].Id;
					if (userIds.Any(i => i == userId)) continue;
					userIds.Add(userId);
				}

				var bm = new CardMembership
				{
					CardId = c.Id,
					UserId = userIds[0]
				};
				var bm2 = new CardMembership
				{
					CardId = c.Id,
					UserId = userIds[1]
				};
				var bm3 = new CardMembership
				{
					CardId = c.Id,
					UserId = userIds[2]
				};
				context.CardMemberships.Add(bm);
				context.CardMemberships.Add(bm2);
				context.CardMemberships.Add(bm3);
			}

			context.SaveChanges();
		}
#endregion

	}
}
