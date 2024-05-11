const mongoose = require('mongoose')

const CollectionPlan = mongoose.Schema({
    areaOfCollection: {
        type: String,
        required: true
    },
    collectionStartTime: {
        type: String,
        required: true,
    },
    durationOfCollection: {
        type: String,
        required: true
    },
    numberOfLabors: {
        type: Number,
        required: true
    },
    numberOfVans: {
        type: Number,
        required: true
    },
    expectedWeight: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('collectionplane', CollectionPlan)