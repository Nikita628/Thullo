using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Text;
using Thullo.Application.Common;
using Thullo.Application.Contracts;
using Thullo.Application.DbModel;
using Thullo.Application.Models;
using Thullo.Application.Services;

namespace Thullo.WebApi
{
    public class Startup
	{
		public static readonly ILoggerFactory MyLoggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(opt =>
				{
					opt.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:TokenSecret").Value)),
						ValidateIssuer = false,
						ValidateAudience = false
					};
				});

			IdentityBuilder ibuilder = services.AddIdentityCore<User>(opt =>
			{
				opt.Password.RequireDigit = false;
				opt.Password.RequiredLength = 5;
				opt.Password.RequireNonAlphanumeric = false;
				opt.Password.RequireUppercase = false;
			});

			ibuilder = new IdentityBuilder(ibuilder.UserType, ibuilder.Services);
			ibuilder.AddEntityFrameworkStores<ThulloDbContext>();
			ibuilder.AddSignInManager<SignInManager<User>>();

			services.AddDbContext<ThulloDbContext>(options => options
				.UseLoggerFactory(MyLoggerFactory)
				.UseSqlServer(Configuration.GetConnectionString("ThulloDb")));

			services.AddCors();
			services.AddControllers().AddNewtonsoftJson();
			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

			services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
			services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

			services.AddScoped<IAuthService, AuthService>();
			services.AddScoped<IBoardListService, BoardListService>();
			services.AddScoped<IBoardService, BoardService>();
			services.AddScoped<ICardAttachmentService, CardAttachmentService>();
			services.AddScoped<ICardCommentService, CardCommentService>();
			services.AddScoped<ICardLabelService, CardLabelService>();
			services.AddScoped<ICardService, CardService>();
			services.AddScoped<ICloudService, CloudService>();
			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IPexelsService, PexelsService>();
			services.AddScoped(typeof(CurrentUserAccessor));
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseExceptionHandler(errorApp =>
			{
				errorApp.Run(async context =>
				{
					context.Response.StatusCode = 500;
					context.Response.ContentType = "application/json";

					var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();

					var response = new Response<object>();

					//if (exceptionHandlerPathFeature?.Error is AppInvalidException exception) response.Errors.Add(exception.Message);
					//else response.Errors.Add("Error during request processing");

					response.Errors.Add(exceptionHandlerPathFeature?.Error.Message);

					context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
					var settings = new JsonSerializerSettings
					{
						ContractResolver = new CamelCasePropertyNamesContractResolver()
					};
					await context.Response.WriteAsync(JsonConvert.SerializeObject(response, settings));
				});
			});

			app.UseCors(opt => opt
			.WithOrigins(Configuration.GetSection("AppSettings:ClientAppUrl").Value)
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials());

			app.UseAuthentication();

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
