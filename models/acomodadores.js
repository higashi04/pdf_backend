const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AcomodadoresSchema = new Schema({
    semana: String,
    audioVideo: {
        type: String,
        
    },
    mezcladora: {
        type: String,
        
    },
    acomodadores: [
        {
           type: String,
            
        }
    ],
    accesos: [
        {
            type: String,
            
        },
    ],
    lector: {
        type: String,
        
    },
    recibidorEntreSemana: {
        type: String,
        
    },
    recibidorFinDeSemana: {
        type: String,
        
    },
    preside: {
        type: String,
        
    },
    aseo: {
        type: String,
        
    },


});

module.exports = mongoose.model("Acomodadores", AcomodadoresSchema);