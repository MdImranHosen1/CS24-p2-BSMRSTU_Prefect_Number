const mongoose = require('mongoose')

const ConstructorManager = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    date: {
        type: Date,
		default: Date.now,
		required: 'Must have a date'
    },
    contactNumber: {
        type: String,
        required: 'Must Have A Contact Number'
    },
    assignedContractorCompany: {
        type: String,
        required: true
    },
    
    accessLevel:{
        type: String,
        required:"Must Have An accessLevel"
    },

    userName:{
        type: String,
        required:"Must Have An Username"
    },
    password:{
        type:String,
        required:"Must Have A Password"
    }
})
module.exports = mongoose.model('constructorManager', ConstructorManager)