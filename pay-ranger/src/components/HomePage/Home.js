import React, {Component} from "react";
import "./Home.css";

const EnterTime = () => {
    return (
        <div className="card m-2 enterTime" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">Enter Time</h5>
                <div className="clock"></div>
                <a href="#" className="btn btn-primary">Go somewhere</a>
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
                <a href="#" className="btn btn-primary">Go somewhere</a>
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
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
    
}

class Home extends Component{
    render() {
        return (
            <div className = "row d-flex align-items-center justify-content-center">
                <h2>HomePage</h2>
                <EnterTime />
                <ViewPayroll/>
                <ViewEmployee />
                
            </div>
            
            
        )
            
        
    }
}

export default Home
