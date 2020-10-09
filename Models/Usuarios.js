const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const moment = require('moment-timezone');

let usuarioSchema = new Schema({
    nombrecompleto: {
        type: String,
        required: [true, 'Nombre y apellido requeridos']
    },
    nombreusuario: {
        type: String,
        required: [true, 'Nombre de usuario requerido'],
        unique: true
    },
    correo: {
        type: String
    },
    clave: {
        type: String,
        required: [true, 'Password requerida']
    },
    telefono: {
        type: Number
    },
    imagen: {
        type: Array,
        default: [{
            path: 'notfound.png'
        }]
    },

    estado: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['USER_ROLE', 'ADMIN_ROLE'],
            message: '{PATH} no es un role permitido'
        }
    },
    pais: {
        type: String
    },
    ciudad: {
        type: String
    },
    deportes: {
        type: Array
    },
    usuarioID: {
        type: String,
    },
    fecha: {
        type: Date,
    }

})


module.exports = mongoose.model('usuarios', usuarioSchema);