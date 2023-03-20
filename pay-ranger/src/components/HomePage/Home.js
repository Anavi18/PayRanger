import React, {Component} from "react";

const EnterTime = () => {
    return (
        <div className="card m-2" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">Enter Time</h5>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}
const ViewPayroll = () => {
    return (
        <div className="card m-2" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">View Payroll</h5>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
    
}
const ViewEmployee = () => {
    return (
        <div className="card m-2" style={{width: '30em', height: '20em'}}>
            <div className="card-body">
                <h5 className="card-title">View Employee</h5>
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