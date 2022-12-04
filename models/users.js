const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AncianoSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    congregacion: String
});

module.exports = mongoose.model('Anciano', AncianoSchema);