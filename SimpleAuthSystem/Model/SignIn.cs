using Microsoft.AspNetCore.Mvc;

namespace SimpleAuthSystem.Model
{
    public class SignInRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class SignInResponse
    {
        public int UserId { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

        public bool IsActive { get; set; }
        public ObjectResult ObR { get; set; }
    }
    
}
