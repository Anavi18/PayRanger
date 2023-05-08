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
        console.log(req.body);
        employee = await employeeModel.findOne({employeeId: req.body.employeeId });
        let array = []
        if(employee.isManager){
            console.log("here??")
            data = await employeeModel.find({managerId: employee.employeeId});
            data.forEach((x)=>array.push({ 
                "firstName": x.firstName, 
                "lastName": x.lastName, 
                "employeeId": x.employeeId, 
                "companyId": x.companyId
            }))
        }
        console.log("hello")
        console.log(array)
        res.status(200).json(array)
    }catch(error){
        res.status(400).json(error)
    }
})

app.post("/login", async (req, res) => {
    try{
        username = req.body.email
        pwd = req.body.password

        user = await employeeModel.findOne({ email: username});
        if (user != null && user.password == pwd){
            res.status(200).json({ 
            "employeeId": user.employeeId, 
            "companyId": user.companyId, 
            "firstName": user.firstName,
            "lastName": user.lastName,
            "isManager": user.isManager
            })
        }
        else{
            res.status(401).json({})
        }   
    }catch(error){
        res.status(400).json(error) 
    }
})

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

        data = await timeEntryModel.findOne({ employeeId: id});
        user = await employeeModel.findOne({employeeId: id});
        sal = parseFloat(user.salary)
        let numHours = 0;
        let timeEntries = data.timeEntries

        for (let x = 0; x < timeEntries.length; x++){
            if((timeEntries[x].date >= startDate) && (timeEntries[x].date <= endDate)){
                numHours = numHours + timeEntries[x].hoursWorked;
            }
        }   
        earned = sal * numHours

        if((syear > eyear) || (syear == eyear && smonth > emonth) || (syear == eyear && smonth == emonth && sday > eday)){
            res.status(401).json({})
        }
        else{
            res.status(200).json({"numHours": numHours, "earned": earned})
        }
    }catch(error){
        res.status(400).json(error)
    }
})

app.patch("/submitTime", async (req, res) => {
	try{
        id = req.body.employeeId
        date = req.body.date
        hoursWorked = req.body.hoursWorked
 
        year = parseInt(date.slice(0, 4))
        month = parseInt(date.slice(5,7))
        day = parseInt(date.slice(8, 10))

        newDate = new Date(year, month - 1, day)
    
		data = await timeEntryModel.findOne({ employeeId: id});
        let timeEntries = data.timeEntries 
        
        let entryExists = false;
        for (let x = 0; x < timeEntries.length; x++){
            if(timeEntries[x].date.getTime() == newDate.getTime()){
                entryExists = true;
                break;
            }
        }
        
        if (entryExists) {
            res.status(440).json({})
            return
        }
        if (new Date(mongoose.now()) < newDate) {
            res.status(441).json({})
            return
        }

        let toAdd = {"date": newDate, "hoursWorked": hoursWorked}
        timeEntries.push(toAdd)
		await data.save()

		res.status(200).send({})
	}catch(error){
		res.status(400).send(error)
	}
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`))
