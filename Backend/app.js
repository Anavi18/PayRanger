const express = require("express")
const app = express()
app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://hypertech-dev:hUhvoyV8K9RiBG0V@hypertech.zpsrnzp.mongodb.net/Gizmo-Gram?retryWrites=true&w=majority")

const employeeModel = require("./models/employees")

app.get("/getEmployees", async (req, res) => {
    try{
        employee = await employeeModel.findOne({employeeId: req.body.employeeId });
        if(employee.isManager){
            data = await employeeModel.find({managerId: employee.employeeId});
            res.json(data) 
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


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`))