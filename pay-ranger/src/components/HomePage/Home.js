import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "./Home.css";
import clock from "../pictures/clock.jpeg"
import money from "../pictures/money.jpeg"
import employee from "../pictures/employee.jpeg"

const EnterTime = () => {
    return (
        <div className="card m-2 col-4  " style={{width: '20em', height: '25em'}}>
            <img src={clock} className="card-img-top" alt="..."></img>
            <div className="card-body mt-2 mx-auto">
               
                <Link to ="/entertime" ><a href="#" className="btn btn-lg homebtn">Enter Time</a></Link>
            </div>
        </div>
    )
}
const ViewPayroll = () => { 
    return (
        <div className="card m-2 col-4" style={{width: '20em', height: '25em'}}>
            <img src={money} className="card-img-top" alt="..."></img>
            <div className="card-body mt-2 mx-auto">
                
                <div className="document"></div>
                <Link to ="/payroll" ><a href="#" className="btn btn-lg homebtn" >View Payroll</a></Link>
            </div>
        </div>
    )
    
}
const ViewEmployee = () => {
    return (
        <div className="card m-2 col-4 " style={{width: '20em', height: '25em'}}>
            <img src={employee} className="card-img-top" alt="..."></img>
            <div className="card-body mt-2 mx-auto">
                
                <div className="person"></div>
                <Link to ="/employee" ><a href="#" className="btn btn-lg homebtn">View Employee</a></Link>
            </div>
        </div>
    )
    
}


class Home extends Component{
    render() {
        return (
        <div className="homebg ">
        

        <div className=" container">
           
            <EnterTime />
            <ViewPayroll/>
            <ViewEmployee />

        </div>

        </div>
        
	    
        )
    }
}

export default Home;
