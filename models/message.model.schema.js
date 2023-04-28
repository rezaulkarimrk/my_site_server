const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    email: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    phone: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: false,
        default: 'N/A',
    },
    message: {
        type: String,
        require: true,
    },
    railway: {
        type: String,
        require: false,
        default: 'N/A',
    },
    road: {
        type: String,
        require: false,
        default: 'N/A',
    },
    town: {
        type: String,
        require: false,
        default: 'N/A',
    },
    county: {
        type: String,
        require: false,
        default: 'N/A',
    },
    state_district: {
        type: String,
        require: false,
        default: 'N/A',
    },
    state: {
        type: String,
        require: false,
        default: 'N/A',
    },
    ISO3166_2_lvl4: {
        type: String,
        require: false,
        default: 'N/A',
    },
    postcode: {
        type: String,
        require: false,
        default: 'N/A',
    },
    country: {
        type: String,
        require: false,
        default: 'N/A',
    },
    country_code: {
        type: String,
        require: false,
        default: 'N/A',
    },
    ip: {
        type: String,
        require: false,
        default: 'N/A',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    mailCount: {
        type: Number,
        require: true,
    },

});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;