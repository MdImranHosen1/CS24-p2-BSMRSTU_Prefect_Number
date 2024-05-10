const mongoose = require('mongoose')

const UserOtherSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userRoles: [],
    userType: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    stsOrLandfillNum: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('users', UserOtherSchema)


// 1. userId
// 2. userType
// 3. userName
// 4. userPassword
// 5. userRoles
// 6. userPhone
// 7. userEmail