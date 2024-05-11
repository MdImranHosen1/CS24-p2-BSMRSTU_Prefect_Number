const mongoose = require('mongoose')

const BillGeneration = mongoose.Schema({
    thirdPartyId: {
        type: String,
        required: true
    },
    totalCollected: {
        type: Number,
        required: true
    },
    payPerTon: {
        type: Number,
        required: true
    },
    finePerTon: {
        type: Number,
        required: true
    },
    requiredAmount: {
        type: Number,
        required: true
    },
    basicPay: {
        type: Number,
        required: true
    },
    payWithoutFine:{
        type:Number,
        required:true
    }
    // coordinate: {
    //     type: String,
    //     required: true,
    // },
    // operationTimespan: {
    //     type: String,
    //     required: true
    // },
    // managerId: {
    //     type: String,
    //     required: true
    // }
})
module.exports = mongoose.model('billGeneration', BillGeneration)