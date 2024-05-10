const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

const connect = ()=>{
    mongoose.connect(DB_URL)
    .then(()=>{
        console.log('Database Successfully Connected.')
    })
    .catch((err)=>{
        // console.log(err)
        console.log('Database Not Connected.')
    })
}

module.exports = {connect}