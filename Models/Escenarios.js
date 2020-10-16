const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const moment = require('moment-timezone');

let escenariosSchema = new Schema({
    nombre: {
        type: String
    },
    deporte: {
        type: String
    },
    turnos: {
        type: Array
    },
    imagen: {
        type: String
    },

    estado: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
    }

})


module.exports = mongoose.model('escenarios', escenariosSchema);