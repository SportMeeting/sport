const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deporte = new Schema({
    nombre: {
        type: String
    }
})

module.exports = mongoose.model('deportes', Deporte);