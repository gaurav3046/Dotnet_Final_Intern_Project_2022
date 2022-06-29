
import { NavLink } from "react-router-dom";
import React, { Component } from 'react'
import './SignUp.scss'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import axios from "axios";

export default class Booking extends Component {

  constructor() {
    super()
    this.state = {
      list_rooms: [1],
      Radiovalue: 1,
      TC: 0,
      RoomNo: '',
      Password: '',
      PasswordFlag: false,
      open: false,
      Message: '',
      Logged_in: JSON.parse(localStorage.getItem('Login'))
    }
  }
  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }
  CheckValidation() {
    console.log('CheckValidation Calling...')

    this.setState({ PasswordFlag: false })

    if (this.state.Password === '') {
      this.setState({ PasswordFlag: true })
    }
  }
  handleRadioChange = (e) => {
    this.setState({ Radiovalue: parseInt(e.target.value) })
  }
  handleChange = (e) => {
    this.setState(
      { Password: e.target.value }
    )
  }
  handleRadioChange2 = (e) => {

    // e.target.checked=false
    this.setState({ TC: parseInt(e.target.value) })

  }
  handleSelectChange = (e) => {
    this.setState({ RoomNo: e.target.value })
  }
  handleLogout = (e) => {// axios.post('https://localhost:44381/api/Auth/LogOut').then((data) => {
    //   console.log('Data : ', data)
      
    
    
    // }

    // )
    var login={login:false,token:''}
    localStorage.setItem('Login', JSON.stringify(login));
    // this.setState()
    this.props.history.push('/')


  }
  handleBooking = (e) => {

    this.CheckValidation()
    if (this.state.Password !== '' && this.state.TC === 1) {
      console.log('Acceptable'+" "+this.state.Logged_in.UserId)

      let data = {
        roomNo: parseInt(this.state.RoomNo),
        UserId:parseInt(this.state.Logged_in.UserId),
        passWord: this.state.Password,
      }
      axios.post('https://localhost:44381/api/Auth/BookRooms', data,{headers:{
        'Authorization': 'Bearer '+this.state.Logged_in.token
    }}
      ).then((data) => {
        console.log('In Data : ', data)
        if (data.data.isSuccess) {
          this.props.history.push('/Home')

        } else {
          console.log('Something Went Wrong')
          this.setState({ open: true, Message: 'Invalid Request' })
        }
      })
    } else {
      console.log('Not Acceptable')
      if (this.state.TC === 0) {
        this.setState({ open: true, Message: 'You need to accept T&C' })
      }
      else {
        this.setState({ open: true, Message: 'Please Fill Mandetory Field' })
      }

    }
  }
  handleSubmit = (e) => {

    axios.post('https://localhost:44381/api/Auth/AvailableRooms', {
      IsAc: this.state.Radiovalue
    },
    {headers:{
      'Authorization': 'Bearer '+this.state.Logged_in.token
  }}
    ).then((data) => {
      console.log('In Data : ', data)
      this.setState({ list_rooms: data.data.listOfRooms })

    })
  }

  render() {
    const K = this.state.list_rooms
    console.log('State : ', this.state)
    if(this.state.Logged_in.login){
    return (

      <div className="booking">
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
          <div className="SignUp-Container">
            <div className="SignUp-SubContainer">
              <div className="Header">Welcome to Room Booking Portal</div>
              <div className="Body">
                <form className="form">
                  <RadioGroup
                    className="Roles"
                    name="Role"
                    value={this.state.Radiovalue.toString()}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel
                      className="RoleValue"
                      value="1"
                      control={<Radio />}
                      label="AC"
                    />
                    <FormControlLabel
                      className="RoleValue"
                      value="0"
                      control={<Radio />}
                      label="Non AC"
                    />
                  </RadioGroup>
                  <div className="Buttons" style={{ alignItems: 'flex-mid' }}>
                    <Button
                      className="Btn"
                      variant="contained"
                      color="inherit"
                      onClick={this.handleSubmit}
                    >
                      Show Available Rooms
                    </Button>
                  </div>
                  <select class="form-select" aria-label="Default select example" style={{ width: 'auto' }}
                    onChange={this.handleSelectChange}
                  >
                    <option >Select Rooms</option>
                    {K.map((reptile) => <option >{reptile}</option>)};
                  </select>
                  <div className="Charges" style={{ textAlign: 'left', marginTop: '10px' }}>
                    <p style={{ margin: '0 0 0 0 ' }}>Charges For Ac Room: 85,000</p>
                    <p style={{ margin: '0 0 0 0' }}>Charges For Non Ac Room : 55,000</p>
                  </div>
                  {/* <TextField
                    className="TextField"
                    name="UserName"
                    label="UserName"
                    variant="outlined"
                    size="small"
                  error={this.state.UserNameFlag}
                  value={this.state.UserName}
                  onChange={this.handleChange}
                  /> */}
                  <TextField
                    className="TextField"
                    type="password"
                    name="Password"
                    label="ConFirm Password for Booking"
                    variant="outlined"
                    size="small"
                    error={this.state.PasswordFlag}
                    value={this.state.Password}
                    onChange={this.handleChange}
                  />
                  <div>
                    <Radio
                      // checked={this.state.TC===1}
                      onChange={this.handleRadioChange2}
                      value="1"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                    />I accept the Terms and Conditions of Hostel Rooms
                  </div>
                </form>
              </div>
              <div className="Buttons" style={{ alignItems: 'flex-start' }}>
                {/* <Button className="Btn" color="inherit"
                >
                  Sign Up
                </Button> */}
                <Button
                  className="Btn"
                  variant="contained"
                  color="inherit"
                  onClick={this.handleBooking}
                >
                  Confirm
                </Button>
              </div>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              message={this.state.Message}
              action={
                <React.Fragment>
                  <Button color="secondary" size="small" onClick={this.handleClose}>
                    UNDO
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />

          </div>
        </div>
        <footer class="page-footer font-small blue fixed-bottom" style={{ background: "black", color: "white" }}>


          <div class="footer-copyright text-center py-3">Copyright © 2022 All Rights Reserved:&nbsp;
            <a href="/" class="link-secondary">CHMS.com</a>
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