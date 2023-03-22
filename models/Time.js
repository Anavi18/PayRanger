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
  });
