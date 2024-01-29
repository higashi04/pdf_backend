const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    tipo: String
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);