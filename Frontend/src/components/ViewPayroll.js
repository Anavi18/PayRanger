import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";



function Wage({wage, hour}) {
        
        
    return (
        <div >
             <div className="btn btn-success text-dark d-flex justify-content-center btn-lg mb-2">
                You earned ${wage.toString()}
            </div>
            <div className = "btn d-flex justify-content-center btn-lg text-dark" style = {{background: "#E6986B"}}>
                {hour.toString()} hour(s) worked
                
            </div>

        </div>
       
    )

}




export default function ViewPayroll() {

    const [isClicked, setClicked] = React.useState(false);
    const [wage, setWage] = React.useState(0)
    const [hour, setHour] = React.useState(0)

    

    

    const handleSubmit = (event) => {
       
        event.preventDefault()
        setClicked(true)
        setWage( Math.floor(Math.random() * 4000) + 500)
        setHour( Math.floor(Math.random() * 4000) + 40) 
        const request = new Request("http://localhost:8082")
        fetch(request).then( (response) => response.blob() ).then(blob => blob.text()).then(text => console.log(text));
        console.log("Making request");
    }

    
    return (
        <div className="homebg">
            <div className="container">
                <div className="enterTimeFlexbox">
                    <div>
                    <div className="mb-4 d-flex justify-content-center" style = {{color: "#162938"}}>
                        <h4>View My Payroll</h4>
                    </div>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                    <DatePicker label = "FROM" />
                    <DatePicker label = "TO"/>
                    
                    </Stack>
                    <div className="btn mt-4 enter-btn " onClick={handleSubmit} >View</div>
                    <div className="mt-4">{isClicked && <Wage wage={wage} hour = {hour}/>}</div>

                    </LocalizationProvider>

                    
                    </div>
                </div>

            </div>
        </div>
        
    )
    
}

