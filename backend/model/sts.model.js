const mongoose = require('mongoose')

const StsScheama = mongoose.Schema({
    stsName: {
        type: String,
        required: true
    },
    stsNum: {
        type: Number,
        required: true
    },
    wardNum: {
        type: Number,
        required: true,
        unique: true,
    },
    capacity: {
        type: String,
        required: true
    },
    coordinate: {
        type: String,
        required: true,
        unique: true,
    },
    managers: []
})
module.exports = mongoose.model('sts', StsScheama)