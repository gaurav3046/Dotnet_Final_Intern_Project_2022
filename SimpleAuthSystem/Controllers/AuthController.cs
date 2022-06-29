using AuthenticationPlugin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SimpleAuthSystem.DataAccessLayer;
using SimpleAuthSystem.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static SimpleAuthSystem.Model.Mess;

namespace SimpleAuthSystem.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthDL _authDL;
        private IConfiguration _configuration;
        private readonly AuthService _auth;
        public AuthController(IAuthDL authDL, IConfiguration configuration)
        {
            _configuration = configuration;
            _auth = new AuthService(_configuration);
            _authDL = authDL;
        }

        [HttpPost]
        public async Task<ActionResult> SignUp(SignUpRequest request)
        {
            SignUpResponse response = new SignUpResponse();
            try
            {
                response = await _authDL.SignUp(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            LogOutResponse response = new LogOutResponse();
            try
            {
                response = await _authDL.LogOut();
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> SignIn(SignInRequest request)
        {
            SignInResponse response = new SignInResponse();
            try
            {
                response = await _authDL.SignIn(request);
                var claims = new[]
                     {
                       new Claim(JwtRegisteredClaimNames.Email, request.UserName),
                       new Claim(ClaimTypes.Email, request.UserName),
                     };
                var token = _auth.GenerateAccessToken(claims);
                response.ObR= new ObjectResult(new
                                {
                                    access_token = token.AccessToken,
                                    expires_in = token.ExpiresIn,
                                    token_type = token.TokenType,
                                    creation_Time = token.ValidFrom,
                                    expiration_Time = token.ValidTo,
                                });
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);

        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<String>>> UserDetail()
        {
            UserDetailResponse response = new UserDetailResponse();
            try
            {
                response = await _authDL.UserDetail();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> BillDetail(BillDetailRequest request)
        {
            BillDetailResponse response = new BillDetailResponse();
            try
            {
                response = await _authDL.BillDetail(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<List<String>>> AvailableRooms(AvailableRoomsRequest request)
        {
            AvailableRoomResponse response = new AvailableRoomResponse();
            try
            {
                response = await _authDL.AvailableRooms(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> BookRooms(BookRoomsRequest request)
        {
            BookRoomResponse response = new BookRoomResponse();
            try
            {
                response = await _authDL.BookRooms(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> BookMess(BookMessRequest request)
        {
            BookMessResponse response = new BookMessResponse();
            try
            {
                response = await _authDL.BookMess(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }
    }

   }
