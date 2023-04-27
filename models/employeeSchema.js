const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id   : {
        type: String,
        required: true
    },
    fname : {
        type: String,
        required: true
    },
    lname : {
        type: String,
        required: true
    },
    uname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    jdate : {
        type: Date,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    company : {
        type: String,
        required: true
    },
    designation : {
        type: String,
        required: true
    },
    department : {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Employee', employeeSchema);