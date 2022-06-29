import React from "react";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button'

function Navbar() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
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
              
              <li style={{margin:'0 0 20px 0' }}>
            <Button className="Btn" color="Grey"  variant="contained" >
              Log Out
            </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;