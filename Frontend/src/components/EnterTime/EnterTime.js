import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import "./entertime.css";
import { setRef } from "@mui/material";

const totalTime = (from, to) => {
  const timeDiffInMs = to - from;
  const timeDiffInSec = timeDiffInMs / 1000;
  const timeDiffInMins = timeDiffInSec / 60;
  const timeDiffInHour = timeDiffInMins / 60;

  return timeDiffInHour.toFixed(2);
};

function TotalTime({ timeWorked, exist, invalidDate}) {

  if (isNaN(timeWorked)) {
    return (
      <div  className="text-danger d-flex justify-content-center">
        You need to enter your start and end time!{" "}
      </div>
    );
  }
  else if (invalidDate){
    return (
      <div  className="text-danger d-flex justify-content-center">
        Please enter a valid date!{" "}
      </div>

    )

  }
  else if (exist){
    return (
      <div  className="text-danger d-flex justify-content-center">
        Working time on this date was already saved!{" "}
      </div>

    )
  }


  return (
    <div className="d-flex justify-content-center btn btn-success text-dark"> 
      
        {timeWorked} hour(s) worked is saved!
    
    </div>
  );
}

export default function EnterTime(props) {
  const [dateWork, setDateWork] = React.useState(null)
  const [fromTime, setFrom] = React.useState();
  const [toTime, setTo] = React.useState();
  const [clicked, setClicked] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [exist, setExist] = React.useState(false);
  const [invalidDate, setInvalidDate] = React.useState(false);
  const {user} = props

  console.log("1 " + exist.toString())

  const handleTimeSubmit = async () => {

    if (new Date() < dateWork){
      setInvalidDate(true);
      return
      

    }

    let timeworked = totalTime(fromTime, toTime)
    setTime(timeworked);
    setClicked(true)
    setExist(false)
    setInvalidDate(false)
    console.log("2 " + exist.toString())
    
    const response = await fetch("http://localhost:8082/submitTime", {
      method: 'PATCH',
      body: JSON.stringify({ employeeId: user.employeeId, date: dateWork, hoursWorked: timeworked }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( (response) => response.json()).then(res => {
        console.log(res)
        if(res.status == "existed") {
          console.log("here")
          setExist(true)    
        } 

        
   

    });
    
  }


  return (
    <div className=" homebg">
      <div className="container">
        <div className="enterTimeFlexbox">
        <div >
          <div className="mb-4 d-flex justify-content-center" style = {{color: "#162938"}}>
            <h4>Enter Your Time</h4>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DatePicker 
      
              value={dateWork}
              onChange={(newValue) => setDateWork(newValue)}
              />
              <TimePicker
                label="FROM"
                value={fromTime}
                onChange={(newTime) => setFrom(newTime)}
              />
              <TimePicker
                label="TO"
                value={toTime}
                onChange={(newTime) => setTo(newTime)}
              />
            </Stack>
            <div className="btn mt-3 enter-btn" onClick={handleTimeSubmit}>
              Save
            </div>
            <div className="mt-4  msg">
              {clicked && <TotalTime timeWorked = {time} exist = {exist} invalidDate = {invalidDate}/>}
            </div>
          </LocalizationProvider>
      </div>

        </div>
      

      </div>
      
    </div>
  );
}
