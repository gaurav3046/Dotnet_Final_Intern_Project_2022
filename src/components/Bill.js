import './SignUp.scss'
import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button'
const axios = require('axios').default

export default class Bill extends Component {
  constructor() {
    super()
    this.state = {
      BillId: 0,
      MessBill: 0,
      RoomBill: 0,
      Total: 0,
      Logged_in:JSON.parse(localStorage.getItem('Login'))
    }
  }
  handleLogout = (e) => {
   
    // axios.post('https://localhost:44381/api/Auth/LogOut').then((data) => {
    //   console.log('Data : ', data)
      
    
    
    // }

    // )
    var login={login:false,token:''}
    localStorage.setItem('Login', JSON.stringify(login));
    // this.setState()
    this.props.history.push('/')
    

}

  handleBill = (e) => {
      console.log(this.state.Logged_in)
      let data = {
        UserId:parseInt(this.state.Logged_in.UserId),
      }
      axios.post('https://localhost:44381/api/Auth/BillDetail',data,
      {headers:{
        'Authorization': 'Bearer '+this.state.Logged_in.token
    }}
      ).then((data) => {
        console.log('In Data : ', data)
        if (data.data.isSuccess) {
          this.setState({BillId:data.data.billId,RoomBill:data.data.roomBill,MessBill:data.data.messBill,Total:parseInt(data.data.roomBill)+parseInt(data.data.messBill)})

        } else {
          console.log('Something Went Wrong')
          this.setState({ open: true, Message: 'Invalid Request' })
        }
      })
  }

  render() {

    // this.state.BillId=5555
    console.log(this.state.Logged_in)
    if(this.state.Logged_in.login){
    return (
      <div><div className="navigation">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              CHMS
            </NavLink>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/booking">
                    Booking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/mess">
                    Mess
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/store">
                    Store
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bill">
                    Bill
                  </NavLink>

                </li >

                <li style={{ margin: '0 0 20px 0' }}>
                  <Button className="Btn" color="Grey" variant="contained" onClick={this.handleLogout}>
                    Log Out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
        <div className="bill p-3 mb-2 bg-secondary text-white">
          <div class="img">
            <img
              style={{ height: 170 }}
              class=".img-thumbnail rounded"
              src={require('./bill.jpg')}
              alt="non"
            />
          </div>
          <div style={{marginTop:"20px"}}>
            <Button
              className="Btn"
              variant="contained"
              color="black"
              onClick={this.handleBill}
            >
              Show Invoice
            </Button>
          </div>
          <br />
          <section class="bg-secondary p-5 ">
            <div class="table-responsive " id="no-more-tables">
              <table class="table bg-white">
                <thead class="bg-dark text-light">
                  <tr>
                    <th>Bill Id</th>
                    <th>Mess Bill</th>
                    <th>Hostel BIll</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-title="Billid">{this.state.BillId}</td>
                    <td data-title="MessBill">{this.state.MessBill}</td>
                    <td data-title="HostelBill">{this.state.RoomBill}</td>
                    <td data-title="Total"> {this.state.Total}</td>
                  </tr>
                </tbody>


              </table>
            </div>
          </section>
          <footer class="page-footer font-small blue fixed-bottom" style={{ background: "black", color: "white" }}>


            <div class="footer-copyright text-center py-3">Copyright © 2022 All Rights Reserved:&nbsp;
              <a href="/" class="link-secondary">CHMS.com</a>
            </div>


          </footer>
        </div>
      </div>
    );
  }
  else {
    return (<div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    Acess Denied! Please Sign In again &nbsp;&nbsp;<a href='/SignIn'>Sign In</a>

    </div>);

  }
  }
}

