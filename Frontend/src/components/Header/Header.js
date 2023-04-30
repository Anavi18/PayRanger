import React, {useContext, useState} from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
import avatar from "./Icons/avatar.svg";
import { Link } from "react-router-dom";
import { LoginContext } from "../LogIn/LoginContext";
import { DropdownContext } from "../../DropdownContext";

function Header(props) {
  let {user} = props
    let dropdownPair = useContext(DropdownContext);
    let loginPair = useContext(LoginContext);
    const toggleDropdown = (event) => {
      console.log("Toggling dropdown");
      event.stopPropagation();
      dropdownPair.toggleDropdown(current=>!current);
    };
    const toggleDropdownOff = (event) => {
      console.log("Toggling dropdown off");
      dropdownPair.toggleDropdown(current=>false);
    }
    const DropdownLoggedOut = () => {
      return(
        <div className={dropdownPair.dropdown ? "profileDropdown" : "profileDropdownHidden"}>
          <div>
            <Link to="/" onClick={toggleDropdownOff}>Logged Out</Link>
          </div>
        </div>
      )
    }
    const DropdownLoggedIn = () => {
      return(<div className={dropdownPair.dropdown ? "profileDropdown" : "profileDropdownHidden"}>
          <div>
            <Link to="/home" onClick={toggleDropdownOff}>My Dashboard</Link>
          </div>
          <div>
            <Link to="/enter-time" onClick={toggleDropdownOff}>Enter Time</Link>
          </div>
          <div>
            <Link to="/payroll" onClick={toggleDropdownOff}>View Payroll</Link>
          </div>
          <div>
            <Link to="/employee" onClick={toggleDropdownOff}>View Employee</Link>
          </div>
          <div>
            <Link to="/" onClick={() => {loginPair.setIsLoggedIn(current => !current); toggleDropdownOff();}}>Log Out</Link>
          </div>
        </div>);
    }
    return (
      <div className="App-header">
        <div className="Logo"> 
          <div className="LogoName"> Duck Creek Technologies</div>
          <div><img src={logo} alt="logo"/></div>
        </div>
        <div className="Avatar">  
          <div className="Name">{user !== null ? user.firstName + user.lastName : "Not Logged In"}</div>
          <div><a href="#" onClick={toggleDropdown}><img src={avatar} alt="Click here for employee navigation options" className="logo"/></a></div>
        </div>
        {loginPair.isLoggedIn ? <DropdownLoggedIn/> : <DropdownLoggedOut/>}
      </div>
    )
}
export default Header;
