import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Home.css";
import time from './Icons/enter-time.svg';
import payroll from './Icons/view-payroll.svg';
import employee from './Icons/view-employee.svg';

const EnterTime = () => {
    return (
        <Link to="/enter-time"><div className="card m-2 enterTime" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">Enter Time</h5>
                <div className="clock"><img src={time} type="image/svg+xml" alt="A picture of a clock. Click this to enter time worked." width="33%" height="33%"></img></div>
            </div>
        </div></Link>
    )
}
const ViewPayroll = () => { //not yet sure how to implement adding the images, but I've added divs to each where they should go along with the start of some css in Home.css.
    return (
        <div className="card m-2 viewPayroll" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">View Payroll</h5>
                <div className="document"><img src={payroll} type="image/svg+xml" alt="A picture of money. Click this to view your estimated pay." width="33%" height="33%"></img></div>
            </div>
        </div>
    )
    
}
const ViewEmployee = () => {
    return (
        <div className="card m-2 viewEmployee" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">View Employee</h5>
                <div className="person"><img src={employee} type="image/svg+xml" alt="A simple representation of a person. Click here to manager your employees." width="33%" height="33%"></img></div>
            </div>
        </div>
    )
    
}

class Home extends Component{
    render() {
        return (
	    <div>
		<h2>Employee Home Page</h2>
            	<div className = "employee-tiles">
            	    <EnterTime />
            	    <ViewPayroll/>
            	    <ViewEmployee />
            	</div>
            </div>
        )
    }
}

export default Home;
