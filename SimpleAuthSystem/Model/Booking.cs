using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAuthSystem.Model
{
    public class AvailableRoomResponse
    {
        public List<int> ListOfRooms { get; set; }

        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
    public class AvailableRoomsRequest
    {
        public int IsAC { get; set; }
    }

    public class BookRoomResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
    public class BookRoomsRequest
    {
        public int UserId { get; set; }
        public int  RoomNo { get; set; }
        public string password { get; set; }
    }
}
