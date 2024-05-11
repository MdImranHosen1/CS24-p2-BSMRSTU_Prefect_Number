const mongoose = require('mongoose')

const Neighborhood = mongoose.Schema({
    areaCollection: [{
        key: { type: String, required: true },
        value: { type: Number, required: true }
    }]
})
module.exports = mongoose.model('neighborhood', Neighborhood)