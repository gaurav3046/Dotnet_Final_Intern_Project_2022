import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './SignUp.scss'
import Button from '@material-ui/core/Button'
const axios = require('axios').default

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      
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
  render(){
    if(this.state.Logged_in.login){
  return(
    <div className = "home" >
      <div className="navigation">
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
                  <Button className="Btn" color="inherit" variant="contained" onClick={this.handleLogout}>
                    Log Out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="home">

          <div className="container">
            <div className="row align-items-center my-5">
              <div className="col-lg-6">
                <img
                  className="img-fluid rounded mb-4 mb-lg-0"
                  src={require('./hs.jpg')}
                  alt="non"
                />
              </div>
              <div className="col-lg-6">
                <br />
                <p className=" lh-lg font-monospace text-break text-md-start">
                  CHMS "College Hostel Management System" is a software developed for
                  managing various acitvites in the hostel. For the past few years the
                  number of educational intitutions is increasing rapid.Thereby the number
                  of hostels is also increasing for the accomadation of the students studying
                  in this institution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="page-footer font-small blue fixed-bottom" style={{ background: "black", color: "white" }}>


        <div className="footer-copyright text-center py-3">Copyright © 2022 All Rights Reserved:&nbsp;
          <a href="/" className="link-secondary">CHMS.com</a>
        </div>


      </footer>
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
