const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    congregacion: {
        type: Schema.Types.ObjectId,
        ref: 'Congregacion'
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    isAdmin: Boolean,
    canWrite: Boolean,
    isReadOnly: Boolean
});

module.exports = mongoose.model('User', UserSchema);