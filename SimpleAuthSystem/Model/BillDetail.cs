using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAuthSystem.Model
{
    public class BillDetailResponse
    {
        public int BillId { get; set; }
        public int MessBill { get; set; }
        public int RoomBill { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }

    }
    public class BillDetailRequest
    {
        public int UserId { get; set; }
    }
}
