const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcadasSchema = new Schema({
    lat: String,
    lng: String,
    territorio: {
        type: Schema.Types.ObjectId,
        ref: 'Territorios'
    },
    comments: String,
    address: String
})

module.exports = mongoose.model("Marcadas", MarcadasSchema)