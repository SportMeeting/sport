const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ciudades = new Schema({
    nombre: {
        type: String
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Paises'
    }
})

module.exports = mongoose.model('Ciudades', Ciudades);