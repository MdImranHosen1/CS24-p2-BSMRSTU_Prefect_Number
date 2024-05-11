const mongoose = require('mongoose')

const News = mongoose.Schema({
    newsTitle: {
        type: String,
        required: true
    },
    newsBody: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('news', News)