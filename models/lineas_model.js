const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LineasSchema = new Schema({
    latOne: Number,
    lngOne: Number,
    latTwo: Number,
    lngTwo: Number
})

module.exports = mongoose.model("Lineas", LineasSchema);