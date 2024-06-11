const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Horarios = new Schema({
    horario: String,
    rgba: String,
    congregacion: {
        type: Schema.Types.ObjectId,
        ref: "congregaciones"
    }
});

module.exports = mongoose.model("horarios", Horarios);