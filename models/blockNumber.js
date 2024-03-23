const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlocksSchema = new Schema({
    lat: String,
    lng: String,
    territorio: {
        type: Schema.Types.ObjectId,
        ref: 'Territorios'
    },
    worked: Boolean,
    name: String,
})

module.exports = mongoose.model("Blocks", BlocksSchema)