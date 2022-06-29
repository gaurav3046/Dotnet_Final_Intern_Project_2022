// import React from "react";
import React, { Component } from 'react'
import "./profile.css";
import './SignUp.scss';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button'
const axios = require('axios').default

export default class Profile extends Component {
  constructor() {
    super()
    this.state = {

      Logged_in: JSON.parse(localStorage.getItem('Login'))
    }
  }
  handleLogout = (e) => {


    var login = { login: false, token: '' }
    localStorage.setItem('Login', JSON.stringify(login));
    // this.setState()
    this.props.history.push('/')


  }

  render() {
    // console.lo
    if(this.state.Logged_in.login){
    return (
     <div className="profile">
        <div className="navigation">
          <nav className="navbar navbar-expand navbar-dark bg-dark"  >
            <div className="container">
              <NavLink className="navbar-brand" to="/">
                CHMS
              </NavLink>
              <div>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
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
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="250px" src={require('./st.jpg')} alt="nono" /></div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="row mt-3">
                  <div className="col-md-12"><label className="labels">Full Name</label><input type="text" className="form-control" value="" /></div>
                  <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" value="" /></div>
                  <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" value="" /></div>
                  <div className="col-md-12"><label className="labels">Branch With Semester</label><input type="text" className="form-control" value="" /></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onSubmit={this.handleSunmit}>Update</button></div>
              </div>
            </div>

          </div>
        </div>
        <footer className="page-footer font-small blue fixed-bottom" style={{ background: "black", color: "white" }} >


          <div className="footer-copyright text-center py-3">Copyright © 2022 All Rights Reserved:&nbsp;
            <a href="/" className="link-secondary">CHMS.com</a>
          </div>


        </footer>
      </div>
    );}
    else{
      return <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
     Acess Denied! Please Sign In again &nbsp;&nbsp;<a href='/SignIn'>Sign In</a>
      
      
    </div>
      
  }
    }
  }
