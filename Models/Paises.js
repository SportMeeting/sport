const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Paises = new Schema({
    nombre: {
        type: String
    }
})

module.exports = mongoose.model('Paises', Paises);