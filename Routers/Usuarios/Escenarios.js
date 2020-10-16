const express = require('express');
const Escenarios = require('../../Models/Escenarios');
const { verificarToken } = require('../../middleware/verificarToken');
const uniqid = require('uniqid');
const moment = require('moment-timezone');
const file = require('express-fileupload');

const router = express.Router();

router.post('/escenarios', (req, res) => {
    let body = req.body;

    const miEcenario = new Escenarios({
        nombre: body.nombre,
        deporte: body.deporte,
        turnos: body.turnos,
        fecha: moment().utc()
    });

    miEcenario.save((err, doc) => {
        if (err) {
            return res.json({
                exe: false,
                err
            })
        }

        return res.json({
            exe: true,
            response: doc
        })
    })
})


router.post('/excenario/upload', [verificarToken], (req, res) => {


    if (!req.files) {
        return res.json({
            exe: false,
            error: 'No seleccionó nada'
        })
    } else {
        let file = req.files.archivo;
        let nameSecret = uniqid() + moment().tz('America/Bogota').format('YYYYMMDDHHmmss') + file.name;

        file.mv(path.resolve(__dirname, '../../server/public/fotos/', nameSecret), async(errFile) => {
            if (errFile) {
                //    console.log(errFile, 'Error')
                return res.json({
                    exe: false,
                    error: errFile
                })
            }

            let mime = file.mimetype;

            //   console.log('Antes', mime);

            if (mime.includes('image') || mime.includes('Image')) {
                console.log('Despues')
                const media = new Escenarios({
                    nombre: req.get('x-nombre'),
                    deporte: req.get('x-deporte'),
                    turnos: req.get('x-turnos'),
                    imagen: nameSecret,
                    fecha: moment().utc()
                })

                media.save((err, doc) => {
                    if (err) {
                        return res.json({
                            exe: false,
                            error: err
                        })
                    }


                    return res.json({
                        exe: true,
                        response: doc
                    })

                })

            }
        })
    }
})


module.exports = router;