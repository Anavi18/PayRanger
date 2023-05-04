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
                <img src={enterTimeSymbol} className="card-img-top" alt="..."></img>
                <h1 style={styleCardWords}> Enter Time </h1>
            </div>
        </Link>
      );
    }
const ViewPayroll = () => {

    return (
        <Link to="/payroll">
            <div className="card m-2 col-4" style={{ width: '21em', height: '32em' } }>
                <img src={payrollLogo} className="card-img-top" alt="..."></img>
                <h1 style={styleCardWords}> View Payroll </h1>
            </div>
        </Link>
    )
   
}
const ViewEmployee = () => {

    return (
        <Link to="/employee">
            <div className="card m-2 col-4" style={{ width: '21em', height: '32em' } }>
                <img src={employeeLogo} className="card-img-top cit-employee" alt="..."></img>
                <h1 style={styleCardWords}> View Employees </h1>
            </div>
        </Link>
    )
   
}

function isManager(){
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


  if (!isManager()) {
    return (
      <div className="homebg">
        <div className="container d-flex align-items-center">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 mb-4">
              <EnterTime />
            </div>
            <div className="col-12 col-md-6">
              <ViewPayroll />
            </div>
          </div>
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