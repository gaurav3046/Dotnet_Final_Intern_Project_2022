import React, { Component } from 'react'
// import AuthServices from '../services/AuthServices.js'
// const axios = require('axios').default
// const authServices = new AuthServices()
import AuthServices from '../services/AuthServices.js'
const axios = require('axios').default
const authServices = new AuthServices()
export default class HomePage extends Component {
state = {
   username:"",
   email:'',
   phonenumber:'',
   list_user:[]
  }

  
 
    // async componentDidMount() {
    //   authServices.UserDetail().then(res => {
    //     const persons = res.data;
    //     this.setState({ email:persons.email,username:persons.username,phonenumber:persons.phoneNumber ,list_user:persons.listK});
    //     console.log("renderList: "+this.state.list_user)
    // })
   
  
     
      
 

  render() {
    var s=this.state.list_user
    console.log("render2: "+s)
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello bro! 
        {this.state.list_user[1]}
        <ol>
        {s.map((reptile) => (
          <li>{reptile}</li>
        ))}
      </ol>
        
      </div>
    )
    
  }
 
}
