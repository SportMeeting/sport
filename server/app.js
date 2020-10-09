require('../config/config');
const express = require('express');
const cors = require('cors');
const filesUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.disable('x-powered-by');


app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false, limit: '9000mb' }));
app.use(bodyParser.json({ limit: '9000mb' }));
app.use(filesUpload({ useTempFiles: true }));

app.use(express.static(__dirname + '/public'));

app.use(require('../Routers/index.js'));

// Base de datos
mongoose.connect(process.env.URLBD, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
    if (err) {
        return console.log(`Error en la conexión ${err}`);
    }
    console.log('Conectado a la base de datos')

})

//Sockets 


app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(`Error ${err}`);
    }
    console.log(`Ejecutando aplicación en puerto ${process.env.PORT}`);
})