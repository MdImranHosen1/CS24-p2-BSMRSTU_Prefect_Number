const mongoose = require('mongoose')

const VehicleScheam = mongoose.Schema({
    regNum: {
        type: String,
        required: true,
        unique: true,
    },
    stsID: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    costLoaded: {
        type: Number,
        required: true
    },
    costUnloaded: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model('vehicles', VehicleScheam)