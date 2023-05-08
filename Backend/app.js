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
        let array = []
        if(employee.isManager){
            data = await employeeModel.find({managerId: employee.employeeId});
            data.forEach((x)=>array.push({ 
                "firstName": x.firstName, 
                "lastName": x.lastName, 
                "employeeId": x.employeeId, 
                "companyId": x.companyId
            }))
        }
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
	    
        startDate = new Date(Date.UTC(syear,smonth-1,sday))
        endDate = new Date(Date.UTC(eyear,emonth-1,eday))
   
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

        newDate = new Date(Date.UTC(year, month - 1, day))
    
		data = await timeEntryModel.findOne({ employeeId: id})

        // create new doc in database if one doesn't exist
        if (data == null) {
            timeEntryModel.create({
                "companyId": comId,
                "employeeId": empId,
                "timeEntries": [{"date": newDate, "hoursWorked": hoursWorked}]
            })
            res.status(201).send({"status": "ok"})
            return
        }

        let timeEntries = data.timeEntries 
   
        let entryExists = false;
        for (let x = 0; x < timeEntries.length; x++){
            if(timeEntries[x].date.getTime() == newDate.getTime()){
                entryExists = true;
                break;
            }
        }

        let ESToffset = 1000*60*60*5
        if (Date.now() < newDate.getTime()+ESToffset) {
            res.status(441).json({"status": "invalid"})
            return
        }
        
        if (entryExists) {
            res.status(440).json({"status": "existed"})
            return
        }

        let toAdd = {"date": newDate, "hoursWorked": hoursWorked}
        timeEntries.push(toAdd)
		await data.save()
        
		res.status(200).send({"status": "ok"})
	}catch(error){
		res.status(400).send(error)
	}
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`))
