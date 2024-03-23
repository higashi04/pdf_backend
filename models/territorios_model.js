const mongoose = require("mongoose");
const Congregacion = require('./congregacion_model');

const Schema = mongoose.Schema;

const TerritoriosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    esquinaLatitudA: Number,
    esquinaLatitudB: Number,
    esquinaLatitudC: Number,
    esquinaLatitudD: Number,
    esquinaLongitudA: Number,
    esquinaLongitudB: Number,
    esquinaLongitudC: Number,
    esquinaLongitudD: Number,
    fechaCreacion: String,
    congregacion: {
        type: Schema.Types.ObjectId,
        ref: `${Congregacion.modelName}`
    },
    marcados: [{
        type: Schema.Types.ObjectId,
        ref: 'Marcadas'
    }],
    blocks: [{
        type: Schema.Types.ObjectId,
        ref: 'Blocks'
    }]
})

TerritoriosSchema.virtual('center').get(function () {
    const longitudeSum = this.esquinaLongitudA + this.esquinaLongitudB + this.esquinaLongitudC + this.esquinaLongitudD;
    const latitudeSum = this.esquinaLatitudA + this.esquinaLatitudB + this.esquinaLatitudC + this.esquinaLatitudD;
    
    const centerLongitude = longitudeSum / 4;
    const centerLantitude = latitudeSum / 4;

    return {
        longitude: centerLongitude,
        latitude : centerLantitude
    };
});

module.exports = mongoose.model('Territorios', TerritoriosSchema);