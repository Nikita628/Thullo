namespace Thullo.WebApi.Dtos.Auth
{
    public class SignIn
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }

    public class SignInResult
    {
        public string Token { get; set; }
        public Dtos.User.User User { get; set; }
    }
}
