using SimpleAuthSystem.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static SimpleAuthSystem.Model.Mess;

namespace SimpleAuthSystem.DataAccessLayer
{
    public interface IAuthDL
    {
        public Task<SignUpResponse> SignUp(SignUpRequest request);

        public Task<SignInResponse> SignIn(SignInRequest request);

        public Task<LogOutResponse> LogOut();
        public Task<UserDetailResponse> UserDetail();
        public Task<BillDetailResponse> BillDetail(BillDetailRequest request);
        public Task<AvailableRoomResponse> AvailableRooms(AvailableRoomsRequest request);

        public Task<BookRoomResponse> BookRooms(BookRoomsRequest request);
        public Task<BookMessResponse> BookMess(BookMessRequest request);
    }
}
