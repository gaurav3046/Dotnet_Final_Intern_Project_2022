using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAuthSystem.Model
{
    public class UserDetailResponse
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }

        public List<String> listK { get; set; }
        public string Email { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
    
}
