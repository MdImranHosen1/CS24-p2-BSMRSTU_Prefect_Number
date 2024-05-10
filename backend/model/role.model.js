const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    // roleId: {
    //     type: String,
    //     required: true
    // },
    roleName: {
        type: String,
        required: true
    },
    roleDetails: {
        type: String,
        required: true,
    },
    roleAssign: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('roles', RoleSchema);
