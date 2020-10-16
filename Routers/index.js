const express = require('express');
const app = express();

app.use(require('./Usuarios/usuarios'));
app.use(require('./Usuarios/Escenarios'));

module.exports = app;