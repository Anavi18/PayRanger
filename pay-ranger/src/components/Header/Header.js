import React from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
function Header() {
    return (
      <div className="App-header">
        Duck Creek Technologies 
        <img src={logo} alt="logo" className="logo" />
      </div>
    )
}
export default Header;