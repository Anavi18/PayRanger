import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import './entertime.css'

const totalTime = (from, to) => {
    const timeDiffInMs = to - from
    const timeDiffInSec = timeDiffInMs/1000
    const timeDiffInMins = timeDiffInSec / 60
    const timeDiffInHour = timeDiffInMins / 60

    return timeDiffInHour.toFixed(2)

  }

function TotalTime({fromTime, toTime}) {
    const total = totalTime(fromTime, toTime)
    if (isNaN(total)) {
        return (
            <button type = "button" className = "btn btn-outline-danger">You need to enter your start and end time </button>

      
        )
    }


    return (
        <div>
            <button type = "button" className = "btn btn-outline-success">Est. working time:  {totalTime(fromTime, toTime)} hour(s)</button>
        </div>
    )

}

export default function EnterTime() {
  const [fromTime, setFrom] = React.useState();
  const [toTime, setTo] = React.useState();
  const [est, setEst] = React.useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    setEst(true)
   
  }

  return (
    <div style={{ margin: "5% 40%" }}>
      <div className="mb-4">
        <h4>Enter Your Time</h4>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DatePicker />
          <TimePicker
            label="FROM"
            value={fromTime}
            onChange={(newValue) => setFrom(newValue)}
          />
          <TimePicker
            label="TO"
            value={toTime}
            onChange={(newValue) => setTo(newValue)}
          />
        </Stack>
        <div className="btn btn-primary mt-3" onClick={handleSubmit}>Save</div>
        <div className="mt-4 msg">{est && <TotalTime fromTime = {fromTime} toTime = {toTime}/>}</div>

      </LocalizationProvider>
    </div>
  );
}
