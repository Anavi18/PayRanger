import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";








export default function ViewPayroll() {

    const [isClicked, setClicked] = React.useState(false);
    const [wage, setWage] = React.useState(0)

    function Wage({wage}) {
        
        
        return (
            <div>
                <button type = "button" class = "btn btn-outline-success">You earned ${wage.toString()}</button>
            </div>
        )
    
    }

    

    const handleSubmit = (event) => {
       
        event.preventDefault()
        setClicked(true)
        setWage( Math.floor(Math.random() * 4000) + 500)
    }

    
    return (
        <div style={{ margin: "5% 40%" }}>
            <div className="mb-4">
                <h4>View My Payroll</h4>
            </div>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
            <DatePicker label = "FROM" />
            <DatePicker label = "TO"/>
            
            </Stack>
            <div className="btn btn-primary mt-4 float-end " onClick={handleSubmit} >View</div>
            <div className="mt-4">{isClicked && <Wage wage={wage}/>}</div>

            </LocalizationProvider>

            
        </div>
    )
    
}

