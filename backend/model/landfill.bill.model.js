const mongoose = require('mongoose')

const LfBillScheam = mongoose.Schema({
    vtId:{
        type:String,
        required:true
    },
    vId:{
        type:String,
        required:true
    },
    stsId:{
        type:String,
        required:true
    },
    weightWaste:{
        type:Number,
        required:true
    },
    arrivalTime:{
        type:Date,
    },
    departureTime:{
        type:Date,
    },
    totalFuelCost:{
        type:Number,
        required:true
    }

})
module.exports = mongoose.model('landfill_bill',LfBillScheam)
