import React, {useContext, useState} from "react";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";
import avatar from "./Icons/avatar.svg";
import { Link } from "react-router-dom";
import { LoginContext } from "../../LoginContext";
function Header() {
    let [dropdown, showProfileDropdown] = useState(false);
    let loginPair = useContext(LoginContext);
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
        <div className={dropdown && loginPair.isLoggedIn ? "profileDropdown" : "profileDropdownHidden"}>
          <div>
            <Link to="/">Log Out</Link>
          </div>
          <div>
            <Link to="/enter-time">Enter Time</Link>
          </div>
          <div>
            <Link to="/view-payroll">View Payroll</Link>
          </div>
          <div>
            <Link to="/view-employee">View Employee</Link>
          </div>
          <div>
            <Link to="/home">My Dashboard</Link>
          </div>
        </div>
      </div>
    )
}
export default Header;