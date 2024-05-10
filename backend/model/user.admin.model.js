const mongoose = require('mongoose')

const UserAdminScheam = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports = mongoose.Model('admin',UserAdminScheam)