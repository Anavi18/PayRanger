import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, {Dayjs} from "dayjs";


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
    const [start, setStart] = React.useState(null)
    const [end, setEnd] = React.useState(null)
    const handleSubmit = (event) => {
        const id = 1; // This should be parameterized using a context in the future
        event.preventDefault()
        setClicked(true)
        const startUsed = start != null ? start.format('YYYY-MM-DD') : "01-01-1970";
        const endUsed = end != null ? end.format('YYYY-MM-DD') : "01-01-1970";
        console.log(startUsed);
        fetch("http://localhost:8082/getHoursWorked", {
            method: "POST",
            body: JSON.stringify({
                "employeeId": id,
                "startDate": startUsed,
                "endDate": endUsed
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then( (response) => response.json() ).then(json => {
            if(JSON.stringify(json) == "{}") {
                setHour(0);
                setWage(0);
                return;
            }
            setHour(json.numHours);
            setWage( json.numHours * Math.floor(Math.random() * 40))
        });
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
                    <DatePicker
                    label="FROM"
                    value={start}
                    onChange={(newValue) => setStart(newValue)}
                    />
                    <DatePicker label = "TO"
                    value={end} 
                    onChange={(newValue) => setEnd(newValue)} 
                    />
                    
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

