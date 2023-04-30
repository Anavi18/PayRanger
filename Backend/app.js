const express = require("express")
const app = express()
var cors = require('cors')


app.use(express.json())
app.use(cors())

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://hypertech-dev:hUhvoyV8K9RiBG0V@hypertech.zpsrnzp.mongodb.net/Gizmo-Gram?retryWrites=true&w=majority")

const employeeModel = require("./models/employees")
const timeEntryModel = require("./models/time-entries")

app.post("/getEmployees", async (req, res) => {
    try{
        employee = await employeeModel.findOne({employeeId: req.body.employeeId });
        if(employee.isManager){
            data = await employeeModel.find({managerId: employee.employeeId});
            let array = []
            data.forEach((x)=>array.push({"firstName":x.firstName, "lastName":x.lastName, "employeeId": x.employeeId}))
            res.json(array)
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
        
        if (user && user.password == pwd){
            res.status(200);
            res.json({
            "response": "Successfully logged in!", 
            "email": user.email, 
            "firstName": user.firstName, 
            "lastName": user.lastName,
            "employeeId":user.employeeId, 
            "auth": true})
        }
        else{
            res.status(401);
            res.json({"response": "not OK, password is incorrect", "auth": false})
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
        console.log(timeEntries)
        for (let x = 0; x < timeEntries.length; x++){

            if((timeEntries[x].date >= startDate) && (timeEntries[x].date <= endDate)){
                numHours = numHours + timeEntries[x].hoursWorked;
            }
        }

        res.json({"response":"OK", "numHours": numHours})
    }catch(error){
        res.json(error)
    }
});

app.patch("/submitTime", async (req, res) => {
	try {
        id = req.body.employeeId
        date = req.body.date
        hoursWorked = req.body.hoursWorked
        
        year = parseInt(date.slice(0, 4))
        month = parseInt(date.slice(5,7))
        day = parseInt(date.slice(8, 10))

        newDate = new Date(year,month-1,day,-5,0,0,0)
    
		data = await timeEntryModel.findOne({ employeeId: id});
        let timeEntries = data.timeEntries 
        
        let flag = false;
        for (let x = 0; x < timeEntries.length; x++){
            if((timeEntries[x].date.valueOf() == newDate.valueOf())){
                console.log("these dates already exist")
                flag = true;
            }
        }
        
        if(flag == false){
            let toAdd = {"date": newDate, "hoursWorked": hoursWorked}
            timeEntries.push(toAdd)
        }
		

		await data.save()
		res.send(data)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`))