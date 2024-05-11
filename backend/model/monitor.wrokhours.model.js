const mongoose = require('mongoose')

const MonitorWorkHours = mongoose.Schema({
    employeeId:{
        type:String,
        required:true
    },
    dailyLogin: {
        type: Number,
        required: true
    },
    dailyLogout: {
        type: String,
        required: true,
    },
    overtimeHours: {
        type: Number,
        required: true
    },
    absence: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('wrokhours', MonitorWorkHours)