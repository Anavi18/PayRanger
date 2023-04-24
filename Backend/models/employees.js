const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  employeeId: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyId: {
    type: Number,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  managerId: {
    type: Number,
    required: false
  },
  positionTitle: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  isManager: {
    type:Boolean,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const employeeModel = mongoose.model("employees", EmployeeSchema)
module.exports = employeeModel