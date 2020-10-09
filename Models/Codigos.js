const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Codigos = new Schema({
    codigo: {
        type: String,
    },
    estado: {
        type: Boolean
    }

})
module.exports = mongoose.model('codigos', Codigos);