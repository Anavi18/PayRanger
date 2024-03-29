import React, { Component, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Home.css";
import clock from "../pictures/clock.jpeg";
import money from "../pictures/money.jpeg";
import employee from "../pictures/employee.jpeg";
import enterTimeSymbol from "../pictures/timeClock.png";
import employeeLogo from "../pictures/employeeLogo.png";
import payrollLogo from "../pictures/payrollLogoGreen.png";
import Cookies from "js-cookie";

const styleCardWords = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0',
    marginTop: '4rem',
    padding: '0.5rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black',
};

const EnterTime = () => {

      return (
        <Link to="/enter-time">
            <div className="card m-2 col-4" style={{ width: '21em', height: '32em' } }>
                <img src={enterTimeSymbol} className="card-img-top" alt="Hourglass with a dollar sign; enter-time feature"></img>
                <h1 style={styleCardWords}> Enter Time </h1>
            </div>
        </Link>
      );
    }
const ViewPayroll = () => {

    return (
        <Link to="/payroll">
            <div className="card m-2 col-4" style={{ width: '21em', height: '32em' } }>
                <img src={payrollLogo} className="card-img-top" alt="Hand accepting coins with a dollar sign; payroll feature"></img>
                <h1 style={styleCardWords}> View Payroll </h1>
            </div>
        </Link>
    )
   
}
const ViewEmployee = () => {

    return (
        <Link to="/employee">
            <div className="card m-2 col-4" style={{ width: '21em', height: '32em' } }>
                <img src={employeeLogo} className="card-img-top cit-employee" alt="Three cartoon workers with a clipboard; view-employees feature"></img>
                <h1 style={styleCardWords}> View Employees </h1>
            </div>
        </Link>
    )
   
}

function isManager(){ //checks cookies to see if manager 
    let cookieValue = Cookies.get('userLoggedIn');
    let userLoggedIn = JSON.parse(decodeURIComponent(cookieValue));
    let isManager = userLoggedIn.isManager;
    return isManager;
}

function Home(props){
  const {user, setUser} = props
  
  if (!document.cookie.includes('isLoggedIn=true')) {
    return <Navigate to="/" replace />;
  }

  // home page if not a manager
  // added slight spacing without touching css
  if (!isManager()) {
    return (
      <div className="homebg">
        <div className="container d-flex align-items-center">
          <EnterTime />&nbsp;&nbsp;&nbsp;&nbsp;
          <ViewPayroll />
        </div>
      </div>
    );
  }
  

  return (
        <div className="homebg ">
            <div className=" container d-flex align-items-center">
                <EnterTime />
                <ViewPayroll />
                <ViewEmployee />
            </div>
        </div>
  );

  }




export default Home;
