// models/Employees.js

const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  employeeId: {
    type: Int,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyId: {
    type: Int,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  managerId: {
    type: Int,
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

module.exports = Employees = mongoose.model('employees',EmpSchema);
