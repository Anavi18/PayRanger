const express = require("express")
const app = express()
var cors = require('cors')

app.use(express.json())
app.use(cors())

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://hypertech-dev:hUhvoyV8K9RiBG0V@hypertech.zpsrnzp.mongodb.net/Gizmo-Gram?retryWrites=true&w=majority")

const employeeModel = require("./models/employees")
const timeEntryModel = require("./models/time-entries")

app.get("/getEmployees", async (req, res) => {
    try{
        employee = await employeeModel.findOne({employeeId: req.body.employeeId });
        if(employee.isManager){
            data = await employeeModel.find({managerId: employee.employeeId});
            res.json(data)
        }
        else {
            res.json({})
        }
    }catch(error){
        res.json(error)
    }
});

app.get("/getEmployee", async (req, res) => {
    try{
        id = req.body.employeeId
        data = await employeeModel.find({ employeeId: id});
        res.json(data)
    }catch(error){
        res.json(error)
    }
});

app.post("/login", async (req, res) => {
    try{
        username = req.body.email
        pwd = req.body.password

        user = await employeeModel.findOne({ email: username});

        if (user.password == pwd){
            id = user.employeeId
            res.json({"response": "OK", "employeeId":id})
        }
        else{
            res.json({"response": "not OK, password is incorrect"})
        }   
    }catch(error){
        res.json(error)
    }
});

app.post("/getHoursWorked", async (req, res) => {
    try{
        id = req.body.employeeId
        start = req.body.startDate
        end = req.body.endDate
        syear = parseInt(start.slice(0, 4))
        smonth = parseInt(start.slice(5,7))
        sday = parseInt(start.slice(8, 10))
        eyear = parseInt(end.slice(0, 4))
        emonth = parseInt(end.slice(5,7))
        eday = parseInt(end.slice(8, 10))

        startDate = new Date(syear,smonth-1,sday,-5,0,0,0)
        endDate = new Date(eyear,emonth-1,eday,-5,0,0,0)
        console.log(startDate)
        console.log(endDate)

        data = await timeEntryModel.findOne({ employeeId: id});

        let numHours = 0;
        let timeEntries = data.timeEntries
        for (let x = 0; x < timeEntries.length; x++){

            if((timeEntries[x].date >= startDate) && (timeEntries[x].date <= endDate)){
                console.log("here")
                numHours = numHours + timeEntries[x].hoursWorked;
            }
        }

        res.json({"response":"OK", "numHours": numHours})
    }catch(error){
        res.json(error)
    }
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`))