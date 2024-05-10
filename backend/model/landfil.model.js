const mongoose = require('mongoose')

const LfScheam = mongoose.Schema({
    lfId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true
    },
    coordinate: {
        type: String,
        required: true,
    },
    operationTimespan: {
        type: String,
        required: true
    },
    managerId: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('landfills', LfScheam)