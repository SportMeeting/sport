const express = require('express');
const app = express();

app.use(require('./Usuarios/usuarios'));

module.exports = app;