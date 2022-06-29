import React, { Component } from 'react'
import './SignUp.scss'
import AuthServices from '../services/AuthServices.js'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import { NavLink } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const authServices = new AuthServices()

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      Radiovalue: 0,
      UserName: '',
      Password: '',
      ConfirmPassword: '',
      PhoneNumber: '',
      Email: '',

      PhoneNumberFlag: false,
      EmailFlag: false,
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,

      open: false,
      Message: '',
    }
  }

  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }

  CheckValidity() {
    console.log('Check Validity Calling')
    //Reset Flag
    this.setState({
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
      PhoneNumberFlag: false,
      EmailFlag: false
    })

    if (this.state.UserName === '') {
      this.setState({ UserNameFlag: true })
    }
    if (this.state.Password === '') {
      this.setState({ PasswordFlag: true })
    }
    if (this.state.ConfirmPassword === '') {
      this.setState({ ConfirmPasswordFlag: true })
    }
    if (this.state.Email === '') {
      this.setState({ EmailFlag: true })
    }
    if (this.state.PhoneNumber === '') {
      this.setState({ PhoneNumberFlag: true})
    }
  }

  handleSubmit = (e) => {
    this.CheckValidity()
    if (
      this.state.UserName !== '' &&
      this.state.Password !== '' &&
      this.state.ConfirmPassword !== ''&&
      this.state.PhoneNumber !== ''&&
      this.state.Email !== ''
    ) {
      const data = {
        phonenumber:this.state.PhoneNumber,
        email:this.state.Email,
        userName: this.state.UserName,
        password: this.state.Password,
        configPassword: this.state.ConfirmPassword,
        role: this.state.Radiovalue,
        
      }

      authServices
        .SignUp(data)
        .then((data) => {
          console.log('data : ', data)
          if (data.data.isSuccess) {
            this.props.history.push('/SignIn')
          } else {
            console.log('Sign Up Failed')
            this.setState({ open: true, Message: 'Sign Up Failed' })
          }
        })
        .catch((error) => {
          console.log('error : ', error)
          this.setState({ open: true, Message: 'Something Went Wrong' })
        })
    } else {
      console.log('Not Acceptable')
      this.setState({ open: true, Message: 'Please Fill Required Field' })
    }
  }

  handleRadioChange = (e) => {
    this.setState({ Radiovalue: parseInt(e.target.value) })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(
      { [name]: value },
      console.log('Name : ', name, 'Value : ', value),
    )
  }

  handleSignIn = (e) => {
    this.props.history.push('/SignIn')
  }

  render() {
    console.log('state : ', this.state)
    return (
      <div className="main">
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header">Sign Up</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="UserName"
                label="UserName"
                variant="outlined"
                size="small"
                error={this.state.UserNameFlag}
                value={this.state.UserName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="PhoneNumber"
                label="PhoneNumber"
                variant="outlined"
                size="small"
                error={this.state.PhoneNumberFlag}
                value={this.state.PhoneNumber}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="Email"
                label="Email"
                variant="outlined"
                size="small"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                error={this.state.EmailFlag}
                value={this.state.Email}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                error={this.state.ConfirmPasswordFlag}
                value={this.state.ConfirmPassword}
                onChange={this.handleChange}
              />
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
                  label="Admin"
                />
                <FormControlLabel
                  className="RoleValue"
                  value="0"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </form>
          </div>
          <div className="Buttons">
            <Button className="Btn" color="inherit" onClick={this.handleSignIn}>
              Sign In
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="inherit"
              onClick={this.handleSubmit}
            >
              Sign Up
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
    )
  }
}
