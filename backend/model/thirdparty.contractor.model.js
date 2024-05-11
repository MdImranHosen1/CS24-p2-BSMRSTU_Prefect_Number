const mongoose = require('mongoose')

const ThirdPartyContractorSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    contractID: {
        type: String,
        required: true
    },
    registrationID: {
        type: String,
        required: true,
        unique: true,
    },
    registrationDate: {
        type: String,
        required: true
    },
    tin: {
        type: String,
        required: true,
        unique: true,
    },
    contactNum:{
        type: String,
        required: true
    },
    workspaceSize:{
        type: String,
        required: true
    },
    payment:{
        type: String,
        required: true
    },
    wasteRequiredPerDay:{
        type: Number,
        required: true
    },
    contractDuration:{
        type: String,
        required: true
    },
    collectionArea:{
        type: String,
        required: true
    },
    designatedSTS:{
        type: String,
        required: true
    }

})
module.exports = mongoose.model('thirdpartycontractor', ThirdPartyContractorSchema)