const mongoose = require('mongoose')

const WorkforceRegistration = mongoose.Schema({
    employeeId: {
        type: String,
        required: 'Must Have An Employee ID'
    },
    fullName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
		required: 'Must have a Date Of Birth'
    },
    dateOfHire: {
        type: String,
		required: 'Must have a Hireing Date'
    },
    jobTitle: {
        type: String,
        required: 'Job Title Required'
    },
    paymentPerHour:{
        type: String,
        required:true
    },
    contactInfo:{
        type:String,
        required:true
    },
    assignedRoute:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('workforceRegistration', WorkforceRegistration)