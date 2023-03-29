import React, {Component} from "react";
import "./Home.css";

const EnterTime = () => {
    return (
        <div className="card m-2 enterTime" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">Enter Time</h5>
                <div className="clock"></div>
            </div>
        </div>
    )
}
const ViewPayroll = () => { //not yet sure how to implement adding the images, but I've added divs to each where they should go along with the start of some css in Home.css.
    return (
        <div className="card m-2 viewPayroll" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">View Payroll</h5>
                <div className="document"></div>
            </div>
        </div>
    )
    
}
const ViewEmployee = () => {
    return (
        <div className="card m-2 viewEmployee" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">View Employee</h5>
                <div className="person"></div>
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
