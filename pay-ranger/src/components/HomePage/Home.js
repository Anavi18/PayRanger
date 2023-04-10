import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "./Home.css";
import clock from "../pictures/clock.jpeg"
import money from "../pictures/money.jpeg"
import employee from "../pictures/employee.jpeg"
import enterTimeSymbol from "../pictures/timeClock.png"
import employeeLogo from "../pictures/employeeLogo.png"
import payrollLogo from "../pictures/payrollLogoGreen.png"

const styleCardWords = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0',
    marginTop: '3rem',
    padding: '0.5rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black',
};


const EnterTime = () => {
    const handleButtonClick = () => {
        window.location.href = '/entertime';
      };


      return (
        <div className="card m-2 col-4" style={{ width: '20em', height: '25em' } } onClick={handleButtonClick}>
            <img src={enterTimeSymbol} className="card-img-top" alt="..."></img>
            <h1 style={styleCardWords}> Enter Time </h1>
        </div>
      );
    }
const ViewPayroll = () => {
    const handleButtonClick = () => {
        window.location.href = '/payroll';
      };
    return (
        <div className="card m-2 col-4" style={{ width: '20em', height: '25em' } } onClick={handleButtonClick}>
            <img src={payrollLogo} className="card-img-top" alt="..."></img>
            <h1 style={styleCardWords}> View Payroll </h1>
        </div>
    )
   
}
const ViewEmployee = () => {
    const handleButtonClick = () => {
        window.location.href = '/employee';
      };
    return (
        <div className="card m-2 col-4" style={{ width: '20em', height: '25em' } } onClick={handleButtonClick}>
            <img src={employeeLogo} className="card-img-top" alt="..."></img>
            <h1 style={styleCardWords}> View Employees </h1>
        </div>
    )
   
}


class Home extends Component{
    render() {
        return (
        <div className="homebg ">
        

        <div className=" container d-flex align-items-center">
           
            <EnterTime />
            <ViewPayroll/>
            {/* <EnterTime /> */}
            <ViewEmployee />

        </div>

        </div>
        
	    
        )
    }
}

export default Home;
