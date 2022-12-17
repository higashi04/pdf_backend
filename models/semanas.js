const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SemanaSchema = new Schema({
    Fecha: String,
    rolAcomodadores: {
        type: Schema.Types.ObjectId,
        ref: "Acomodadores"
    }
});

module.exports = mongoose.model("Semanas", SemanaSchema);