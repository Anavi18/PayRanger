import React from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
import avatar from "./Icons/avatar.svg";
function Header() {
    return (
      <div className="App-header">
        <div className="Logo"> 
          <div className="LogoName"> Duck Creek Technologies</div>
          <div><img src={logo} alt="logo"/></div>
        </div>
        <div className="Avatar">
          <div className="Name">Employee Name</div>
          <div><img src={avatar} alt="Click here for employee navigation options" className="logo" /></div>
        </div>
      </div>
    )
}
export default Header;