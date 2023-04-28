const { default: mongoose } = require("mongoose");

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }, 
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;