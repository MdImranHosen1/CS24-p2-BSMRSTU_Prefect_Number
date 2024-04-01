const mongoose = require('mongoose')

const VehicleScheam = mongoose.Schema({
    // vId:{
    //     type:String,
    //     required:true
    // },
    stsNum:{
        type:String,
      
    },
    lfNum:{
        type:Number,
        required:true
    },
    vehRegNum:{
        type:String,
        required:true
    },
    weightWaste:{
        type:Number,
        required:true
    },
    arrivalTime:{
        type:Date,
        // required:true
    },
    departureTime:{
        type:Date,
        // required:true
    },
    travelDistance:{
        type:Number,
        required:true
    }

})
module.exports = mongoose.model('sts_transaction',VehicleScheam)