import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import clock from "../pictures/clock.jpeg";
import money from "../pictures/money.jpeg";
import employee from "../pictures/employee.jpeg";
import enterTimeSymbol from "../pictures/timeClock.png";
import employeeLogo from "../pictures/employeeLogo.png";
import payrollLogo from "../pictures/payrollLogoGreen.png";

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

  return (
    
        <div className="homebg ">
            <div className=" container d-flex align-items-center">
                <EnterTime />
                <ViewPayroll />
                <ViewEmployee />
            </div>
            </div>
        

  );


export default Home;
