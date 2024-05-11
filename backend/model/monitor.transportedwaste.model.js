const mongoose = require('mongoose')

const MonitorTransportedWaste = mongoose.Schema({
    date: {
        type: Date,
		default: Date.now,
		required: 'Must have a date'
    },
    amountOfWaste: {
        type: String,
        required: true,
    },
    contractorId: {
        type: String,
        required: true
    },
    wasteType: {
        type: String,
        required: true,
    },
    designatedSts:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('montitorTransportedWaste', MonitorTransportedWaste)