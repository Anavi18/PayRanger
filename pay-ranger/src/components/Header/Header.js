import React from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
import avatar from "./Icons/avatar.svg";
function Header() {
    return (
      <div className="App-header">
        <div className="Logo"> Duck Creek Technologies 
         <img src={logo} alt="logo"/>
        </div>
        <div className="Avatar">
          Employee Name
          <img src={avatar} alt="Click here for employee navigation options" className="logo" />
        </div>
      </div>
    )
}
export default Header;