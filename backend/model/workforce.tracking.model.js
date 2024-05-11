const mongoose = require('mongoose')

const WorkforceTracking = mongoose.Schema({
    employeeId: {
        type: String,
        required: 'Must Have An Employee ID'
    },
    servingWard:{
        type:Number,
        required:true
    },
    fullName: {
        type: String,
        required: true,
    },
    employeeType: {
        type: String,
        required: 'Type Required'
    },
    serviceThisMonth:[]
})
module.exports = mongoose.model('workforceTrack', WorkforceTracking)