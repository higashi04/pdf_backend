const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AcomodadoresSchema = new Schema({
    semana: {
        type: Schema.Types.ObjectId,
        ref: 'Semanas'
    },
    audioVideo: {
        type: String,
        required: true
    },
    mezcladora: {
        type: String,
        required: true
    },
    zoom: {
        type: String,
        required: true
    },
    acomodadores: [
        {
           type: String,
            required: true
        }
    ],
    accesos: [
        {
            type: String,
            required: true
        },
    ],
    lector: {
        type: String,
        required: true
    },
    recibidorEntreSemana: {
        type: String,
        required: true
    },
    recibidorFinDeSemana: {
        type: String,
        required: true
    },
    preside: {
        type: String,
        required: true
    },
    aseoEntreSemana: {
        type: String,
        required: true
    },
    aseoFinDeSemana:{
        type: String,
        required: true
    },

});

module.exports = mongoose.model("Acomodadores", AcomodadoresSchema);