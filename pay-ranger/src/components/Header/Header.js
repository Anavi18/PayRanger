import React, {useState} from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
import avatar from "./Icons/avatar.svg";
import {Link} from "react-router-dom";
function Header() {
    let [dropdown, showProfileDropdown] = useState(false);
    const toggleDropdown = (event) => {
      showProfileDropdown(current=>!current);
    };
    return (
      <div className="App-header">
        <div className="Logo"> 
          <div className="LogoName"> Duck Creek Technologies</div>
          <div><img src={logo} alt="logo"/></div>
        </div>
        <div className="Avatar">
          <div className="Name">Employee Name</div>
          <div><a href="#" onClick={toggleDropdown}><img src={avatar} alt="Click here for employee navigation options" className="logo" /></a></div>
        </div>
        <div className={dropdown ? "profileDropdown" : "profileDropdownHidden"}>
          <div>
            <a href="/">Log Out</a>
          </div>
          <div>
            <a href="/enter-time">Enter Time</a>
          </div>
          <div>
            <a href="/view-payroll">View Payroll</a>
          </div>
          <div>
            <a href="/view-employee">View Employee</a>
          </div>
          <div>
            <a href="/home">My Dashboard</a>
          </div>
        </div>
      </div>
    )
}
export default Header;