import React, {useContext, useState} from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
import avatar from "./Icons/avatar.svg";
import { Link } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
import { DropdownContext } from "../../DropdownContext";

function Header() {
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
            <Link to="/">Logged Out</Link>
          </div>
        </div>
      )
    }
    const DropdownLoggedIn = () => {
      return(<div className={dropdownPair.dropdown ? "profileDropdown" : "profileDropdownHidden"}>
          <div>
            <Link to="/" onClick={() => {loginPair.setIsLoggedIn(current => !current)}}>Log Out</Link>
          </div>
          <div>
            <Link to="/enter-time">Enter Time</Link>
          </div>
          <div>
            <Link to="/payroll">View Payroll</Link>
          </div>
          <div>
            <Link to="/employee">View Employee</Link>
          </div>
          <div>
            <Link to="/home">My Dashboard</Link>
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
          <div className="Name">{loginPair.isLoggedIn ? "Employee Name" : "Not Logged In"}</div>
          <div><a href="#" onClick={toggleDropdown}><img src={avatar} alt="Click here for employee navigation options" className="logo"/></a></div>
        </div>
        {loginPair.isLoggedIn ? <DropdownLoggedIn/> : <DropdownLoggedOut/>}
      </div>
    )
}
export default Header;