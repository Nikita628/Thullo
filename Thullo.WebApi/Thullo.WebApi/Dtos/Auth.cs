using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thullo.WebApi.Dtos.Auth
{
    public class SignIn
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
