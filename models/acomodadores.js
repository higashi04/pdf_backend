const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AcomodadoresSchema = new Schema({
    name: String
});

module.exports = mongoose.model("Acomodadores", AcomodadoresSchema);