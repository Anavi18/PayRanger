import React from "react";
import Home from "../HomePage/Home";
import LogIn from "../LogIn/LogIn";
import EnterTime from "../EnterTime/EnterTime";
import ViewEmployee from "../ViewEmployee/ViewEmployees";
import ViewPayroll from "../ViewPayroll";
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";
import "./Header.css";
import logo from "./cropped-duck-creek-favicon-32x32.webp";

function Header() {
  return (
    <nav
      id="menu"
      className="navbar navbar-tabs"
      style={{ background: "#162938" }}
    >
      <div className="container-fluid">
        <div className="navbar-brand m-2 ">
          <Link to="/">
            <a style={{ color: "rgb(193, 108, 108)" }}>
              Duck Creek Technologies
            </a>
          </Link>
          <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="justify-content-end">
          <li className="nav-item ">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "#D2691E" }}
            >
              <a>Home</a>
            </Link>
          </li>
          <div className="nav-item ">
            <Link
              to="/entertime"
              style={{ textDecoration: "none", color: "#D2691E" }}
            >
              <a>Enter Time</a>
            </Link>
          </div>
          <div className="nav-item ">
            <Link
              to="/payroll"
              style={{ textDecoration: "none", color: "#D2691E" }}
            >
              <a>View Payroll</a>
            </Link>
          </div>
          <div className="nav-item ">
            <Link
              to="/employee"
              style={{ textDecoration: "none", color: "#D2691E" }}
            >
              <a>View Employee</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
