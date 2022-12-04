const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brotherSchema = new Schema({
    nombre: String,
    congregacion: String,
});

module.exports = mongoose.model("Brothers", brotherSchema);