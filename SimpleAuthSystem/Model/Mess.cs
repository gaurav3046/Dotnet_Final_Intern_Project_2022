using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAuthSystem.Model
{
    public class Mess
    {
        public class BookMessResponse
        {
            public bool IsSuccess { get; set; }
            public string Message { get; set; }
        }
        public class BookMessRequest
        {
            public int UserId { get; set; }
            public int MessType { get; set; }
            public string password { get; set; }
        }
    }
}
