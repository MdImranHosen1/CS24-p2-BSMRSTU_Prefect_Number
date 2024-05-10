const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('permissions', PermissionSchema);
