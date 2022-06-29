using Microsoft.Extensions.Configuration;
using SimpleAuthSystem.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using static SimpleAuthSystem.Model.Mess;

namespace SimpleAuthSystem.DataAccessLayer
{
    public class AuthDL : IAuthDL
    {
        public readonly IConfiguration _configuration;
        public readonly SqlConnection _mySqlConnection;
        
        public AuthDL(IConfiguration configuration)
        {
            
            _configuration = configuration;
            //_mySqlConnection = new MySqlConnection(_configuration["ConnectionStrings:MySqlDBConnectionString"]);
            _mySqlConnection = new SqlConnection(_configuration["ConnectionStrings:MySqlDBConnectionString"]);
        }
        public async Task<UserDetailResponse> UserDetail()
        {
            UserDetailResponse response = new UserDetailResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            response.listK = new List<string>();
            try
            {

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }

                string SqlQuery1 = @"SELECT * 
                                    FROM userdetail ";
                using (SqlCommand sqlCommand = new SqlCommand(SqlQuery1, _mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (dataReader.HasRows)
                        {
                            while (dataReader.Read())
                            {
                                response.listK.Add(dataReader.GetString(1));
                               
                                //response.UserName = dataReader.GetString(1);
                                //response.Email = dataReader.GetString(7);
                                //response.PhoneNumber = dataReader.GetString(6);
                            }


                        }
                        else
                        {
                            response.IsSuccess = false;
                            response.Message = "User Unsuccessfully";
                            return response;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;

        }
        public async Task<SignInResponse> SignIn(SignInRequest request)
        {
            SignInResponse response = new SignInResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            response.IsActive = false;
            try
            {

                if(_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }

                string SqlQuery1 = @"SELECT UserID 
                                    FROM userdetail 
                                    WHERE UserName=@UserName AND PassWord=@PassWord AND Role=@Role;";
                using (SqlCommand sqlCommand = new SqlCommand(SqlQuery1, _mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserName", request.UserName);
                    sqlCommand.Parameters.AddWithValue("@PassWord", request.Password);
                    int roleF = request.Role == "Admin" ? 1 : 0;
                    sqlCommand.Parameters.AddWithValue("@Role", roleF);
                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (dataReader.HasRows)
                        {
                            response.Message = "Login Successfully";
                            while (dataReader.Read())
                            {
                                response.UserId = dataReader.GetInt32(0);
                            }
                            dataReader.Close();
                            
                        }
                        else
                        {
                            response.IsSuccess = false;
                            response.Message = "Login Unsuccessfully";
                            return response;
                        }
                    }
                }

            }
            catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;
        }

        public async Task<SignUpResponse> SignUp(SignUpRequest request)
        {
            SignUpResponse response = new SignUpResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {
                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }

                if (!request.Password.Equals(request.ConfigPassword))
                {
                    response.IsSuccess = false;
                    response.Message = "Password & Confirm Password not Match";
                    return response;
                }

                string SqlQuery = @"INSERT INTO userdetail 
                                    (UserName, PassWord, Role,PhoneNumber,Email,InsertionDate) VALUES 
                                    (@UserName, @PassWord, @Role,@PhoneNumber,@Email,GETUTCDATE())";

                using (SqlCommand sqlCommand = new SqlCommand(SqlQuery, _mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserName", request.UserName);
                    sqlCommand.Parameters.AddWithValue("@PassWord", request.Password);
                    sqlCommand.Parameters.AddWithValue("@Role", request.Role);
                    sqlCommand.Parameters.AddWithValue("@PhoneNumber", request.PhoneNumber);
                    sqlCommand.Parameters.AddWithValue("@Email", request.Email);
                    int Status = await sqlCommand.ExecuteNonQueryAsync();
                    if(Status <= 0)
                    {
                        response.IsSuccess = false;
                        response.Message = "Something Went Wrong";
                        return response;
                    }
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;
        }

        public async Task<LogOutResponse> LogOut()
        {
            LogOutResponse response = new LogOutResponse();
            response.Message = "Successful";
            try
            {

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }

                string SqlQuery = @"UPDATE  userdetail SET IsActive=0";
                
                

                    using (SqlCommand sqlCommand = new SqlCommand(SqlQuery, _mySqlConnection))
                    {
                        int Status = await sqlCommand.ExecuteNonQueryAsync();
                        if (Status <= 0)
                        {
                            response.Message = "Something Went Wrong";
                            return response;
                        }
                    }
                

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;
        }

        public async Task<AvailableRoomResponse> AvailableRooms(AvailableRoomsRequest request)
        {
            AvailableRoomResponse response = new AvailableRoomResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            response.ListOfRooms = new List<int>();
            try
            {

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }
                string SqlQuery1;
                if (request.IsAC == 1)
                {
                    SqlQuery1 = @"SELECT * 
                                    FROM Booking where IsAv=1 and IsAC=1";
                }
                else
                {
                    SqlQuery1 = @"SELECT * 
                                    FROM Booking where IsAv=1 and IsAc=0";
                }
                using (SqlCommand sqlCommand = new SqlCommand(SqlQuery1, _mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (dataReader.HasRows)
                        {
                            while (dataReader.Read())
                            {
                                response.ListOfRooms.Add(dataReader.GetInt32(0));

                                //response.UserName = dataReader.GetString(1);
                                //response.Email = dataReader.GetString(7);
                                //response.PhoneNumber = dataReader.GetString(6);
                            }


                        }
                        else
                        {
                            response.IsSuccess = false;
                            response.Message = "User Unsuccessfully";
                            return response;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;

        }
        public async Task<BookRoomResponse> BookRooms(BookRoomsRequest request)
        {
            BookRoomResponse response = new BookRoomResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }
                string SqlQuery1 = @"Select [HasRoom] from userBook
                                    where userId=@Uid";

                SqlCommand sqlCommand1 = new SqlCommand(SqlQuery1, _mySqlConnection);
                sqlCommand1.Parameters.AddWithValue("@Password", request.password);
                sqlCommand1.Parameters.AddWithValue("@Uid", request.UserId);
                DbDataReader dataReader = await sqlCommand1.ExecuteReaderAsync();
                int uid = -1;
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        if (!dataReader.GetBoolean(0))
                        {
                            uid = request.UserId;
                        }
                        
                    }

                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Incorrect Password";
                }
                if (uid != -1)
                {
                    dataReader.Close();
                    string SqlQuery2 = @"UPDATE Booking SET IsAv=0,UserId=@Uid,BookingDate=GETUTCDATE() where RoomId=@roomID";

                    using (SqlCommand sqlCommand2 = new SqlCommand(SqlQuery2, _mySqlConnection))
                    {
                        sqlCommand2.CommandType = System.Data.CommandType.Text;
                        sqlCommand2.CommandTimeout = 180;
                        sqlCommand2.Parameters.AddWithValue("@roomID", request.RoomNo);
                        sqlCommand2.Parameters.AddWithValue("@UiD", uid);
                        int Status = await sqlCommand2.ExecuteNonQueryAsync();
                        if (Status <= 0)
                        {
                            response.Message = "Something Went Wrong";
                            return response;
                        }

                    }
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Already has room";
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;

        }
        public async Task<BookMessResponse> BookMess(BookMessRequest request)
        {
            BookMessResponse response = new BookMessResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }
                string SqlQuery1 = @"Select [HasMess] from userBook where UserId=@Uid";

                SqlCommand sqlCommand1 = new SqlCommand(SqlQuery1, _mySqlConnection);
                sqlCommand1.Parameters.AddWithValue("@Password", request.password);
                sqlCommand1.Parameters.AddWithValue("@Uid", request.UserId);
                DbDataReader dataReader = await sqlCommand1.ExecuteReaderAsync();
                int uid = -1;
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        if(!dataReader.GetBoolean(0))
                            uid = request.UserId;
                        
                    }

                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Incorrect Password";
                }
                if (uid != -1)
                {
                    dataReader.Close();
                    string SqlQuery2 = @"insert into mess values(@MessType,@UId,GETUTCDATE())";

                    using (SqlCommand sqlCommand2 = new SqlCommand(SqlQuery2, _mySqlConnection))
                    {
                        sqlCommand2.CommandType = System.Data.CommandType.Text;
                        sqlCommand2.CommandTimeout = 180;
                        sqlCommand2.Parameters.AddWithValue("@MessType", request.MessType);
                        sqlCommand2.Parameters.AddWithValue("@UiD", uid);
                        int Status = await sqlCommand2.ExecuteNonQueryAsync();
                        if (Status <= 0)
                        {
                            response.Message = "Something Went Wrong";
                            return response;
                        }

                    }
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Already has room";
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;

        }
     
        public async Task<BillDetailResponse> BillDetail(BillDetailRequest request)
        {
            BillDetailResponse response = new BillDetailResponse();
            response.IsSuccess = true;
            response.Message = "Successful";
            try
            {

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }
                //string SqlQuery1 = @"Select [UserId] from userdetail where IsActive=1";

                //SqlCommand sqlCommand1 = new SqlCommand(SqlQuery1, _mySqlConnection);
                //DbDataReader dataReader = await sqlCommand1.ExecuteReaderAsync();
                //int uid = -1;
                //if (dataReader.HasRows)
                //{
                //    while (dataReader.Read())
                //    {
                //        uid = dataReader.GetInt32(0);
                //        break;
                //    }


                //}
                //else
                //{
                //    response.IsSuccess = false;
                //    response.Message = "Incorrect Password";
                //}
                //dataReader.Close();
                int uid = request.UserId;
                if (uid != null)
                {
                    
                    string SqlQuery2 = @"select BillID,Roombill,MessBill from bill where UserID=@uid";

                    using (SqlCommand sqlCommand2 = new SqlCommand(SqlQuery2, _mySqlConnection))
                    {
                        sqlCommand2.CommandType = System.Data.CommandType.Text;
                        sqlCommand2.CommandTimeout = 180;
                        sqlCommand2.Parameters.AddWithValue("@UiD", uid);
                        //dataReader = await sqlCommand2.ExecuteReaderAsync();
                        DbDataReader dataReader = await sqlCommand2.ExecuteReaderAsync();
                        while (dataReader.Read())
                        {
                            response.BillId = dataReader.GetInt32(0);
                            response.RoomBill= dataReader.GetInt32(1);
                            response.MessBill = dataReader.GetInt32(2);
                            return response;
                        }

                    }
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Already has room";
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {

            }

            return response;

        }
    }
}
