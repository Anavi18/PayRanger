const mongoose = require("mongoose")
const TimeEntrySchema = new mongoose.Schema({
    companyId: {
      type: Number,
      required: true
    },
    employeeId: {
      type: Number,
      required: true
    },
    timeEntries: [{
        date : Date,
        hoursWorked : Number
         }]
  },{
    versionKey:false
  });

  const timeEntryModel = mongoose.model("time-entries", TimeEntrySchema)
  module.exports = timeEntryModel