const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CongregacionSchema = new Schema({
    nombre: String,
    activo: Boolean
}, {
    collection: 'congregaciones'
}
)

module.exports = mongoose.model('Congregacion', CongregacionSchema);