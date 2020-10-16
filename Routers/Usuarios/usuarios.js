const express = require('express');
const Usuarios = require('../../Models/Usuarios');
const jwt = require('jsonwebtoken');
const { verificarToken } = require('../../middleware/verificarToken');

const Paises = require('../../Models/Paises');
const Ciudades = require('../../Models/Ciudades');
const Codigos = require('../../Models/Codigos');
const TiposNegocio = require('../../Models/Deportes');

const router = express.Router();

router.post('/usuarios/unico', (req, res) => {
    let body = req.body;

    if (typeof body.buscar !== 'undefined' || body.buscar !== '') {
        Usuarios.findOne({ nombreusuario: body.buscar }, (err, response) => {
            if (err) {
                return res.json({
                    exe: false,
                    error: {
                        message: err
                    }
                })
            }

            if (response) {
                res.json({
                    exe: true
                })
            } else {
                res.json({
                    exe: false
                })
            }




        })
    }

})

router.post('/usuarios', (req, res) => {
    let body = req.body;

    if (typeof body.clave === 'undefined' || body.clave === '') {
        return res.json({
            exe: false,
            error: {
                message: 'Error, debe especificar una contraseña'
            }
        })
    }
    let usuario = new Usuarios({
        nombrecompleto: body.nombreCompleto,
        nombreusuario: body.nombreUsuario,
        clave: body.clave,
        correo: body.correo,
        telefono: body.tel,
        role: body.role,
        pais: body.pais,
        ciudad: body.ciudad,
        deportes: body.deportes,
        usuarioID: body.usuarioID
    })

    usuario.save((err, usuarioMoto) => {
        if (err) {
            return res.json({
                exe: false,
                error: {
                    message: err
                }
            })
        }

        const token = jwt.sign({ usuario: usuarioMoto }, process.env.SECRET, { expiresIn: 60 * 60 * 24 })

        return res.json({
            exe: true,
            response: usuarioMoto,
            token
        })


    })
})

router.get('/usuarios/:termino', [verificarToken], (req, res) => {
    const termino = req.params.termino;
    const regexp = new RegExp(termino, 'i');

    Usuarios.find({ nombrecompleto: regexp })
        .exec((err, usuarios) => {
            if (err) {
                res.status(400);
                return res.json({
                    exe: false,
                    response: {
                        message: 'No se pudo realizar la búsqueda'
                    }
                })
            }

            res.json({
                exe: true,
                response: usuarios
            })
        })
})


router.post('/loginUser', (req, res) => {
    console.log('Entramos')
    let body = req.body;
    const dispositivo = req.body.dispositivo;

    if (typeof body.clave === 'undefined' || body.clave === '') {
        //res.status(200)
        return res.json({
            exe: false,
            error: {
                message: 'Debe especificar una contraseña válida'
            }
        })
    }

    console.log('Bien')

    Usuarios.findOne({ $and: [{ nombreusuario: body.usuario }, { clave: body.clave }] })
        .exec((err, usuario) => {
            if (err) {
                return res.json({
                    exe: false,
                    msg: 'Hola que hace',
                    error: {
                        message: err
                    }
                })
            }

            if (usuario) {

                const _id = usuario._id;

                Usuarios.findByIdAndUpdate(_id, { usuarioID: dispositivo }, { new: true }, (errr, usuarioe) => {
                    if (err) {
                        return res.json({
                            exe: false,
                            msg: 'Hola que hace',
                            error: {
                                message: errr
                            }
                        })
                    }



                    let token = jwt.sign({ usuario: usuarioe }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 365 });

                    return res.json({
                        exe: true,
                        response: usuarioe,
                        token
                    })



                })

            } else {
                return res.json({
                    exe: false,
                    usuario,
                    error: {
                        message: 'Credenciales incorrectas'
                    }
                })
            }



        })
})


router.get('/usuarios', [verificarToken], (req, res) => {
    Usuarios.find({}).exec((err, usuario) => {
        if (err) {
            return res.json({
                exe: false,
                err
            })
        }

        res.json({
            exe: true,
            response: usuario,
            ok: true
        })
    })
})


router.put('/usuarios/role/', [verificarToken], (req, res) => {
    const _id = req.usuario._id;
    const role = req.body.role;
    Usuarios.findOneAndUpdate({ _id }, { role: role }, { new: true })
        .exec((err, usuario) => {
            if (err) {
                res.status(200);
                return res.json({
                    exe: false,
                    err
                })
            }

            res.json({
                exe: true,
                response: usuario
            })
        })
})


router.delete('/usuarios', [verificarToken], (req, res) => {

    Usuarios.deleteMany({}, (err, ok) => {
        if (err) {
            req.status(200);
            return res.json({
                exe: false,
                response: err
            })
        }

        res.status(200);
        return res.json({
            exe: true,
            response: ok
        })
    })
})

//PARA EL REGISTRO 


router.post('/paises', (req, res) => {
    const nombre = req.body.nombre;

    const pais = new Paises({
        nombre
    })

    pais.save((err, doc) => {
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



router.post('/ciudad', (req, res) => {
    const nombre = req.body.nombre;
    const pais = req.body.pais;

    const ciudad = new Ciudades({
        nombre,
        pais
    })

    ciudad.save((err, doc) => {
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



router.get('/paises', (req, res) => {
    Paises.find({})
        .lean()
        .exec((err, docs) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
                response: docs
            })
        })
})



router.get('/ciudad', (req, res) => {
    Ciudades.find({ pais: req.get('x-pais') })
        .lean()
        .exec((err, docs) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
                response: docs
            })
        })
})



router.delete('/ciudad', (req, res) => {
    Ciudades.deleteMany({})
        .lean()
        .exec((err, docs) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
                response: docs
            })
        })
})


router.delete('/paises', (req, res) => {
    Paises.deleteMany({})
        .lean()
        .exec((err, docs) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
                response: docs
            })
        })
})

router.put('/codigos', (req, res) => {
    const codigo = req.body.codigo;

    Codigos.find({ codigo, estado: true })
        .lean()
        .exec((err, codigoData) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
                response: codigoData
            })
        })
})



router.put('/codigos/cambiar', (req, res) => {
    const codigo = req.body.codigo;

    Codigos.findOneAndUpdate({ codigo: codigo }, { estado: false })
        .lean()
        .exec((err, codigoData) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
            })
        })
})

router.post('/codigos', (req, res) => {
    const codigo = req.body.codigo;

    const miCodigo = new Codigos({
        codigo,
        estado: true
    })

    miCodigo.save((err, codigoData) => {
        if (err) {
            return res.json({
                exe: false,
                err
            })
        }

        return res.json({
            exe: true
        })
    })
})

router.post('/tiponegocio', (req, res) => {
    const nombre = req.body.nombre;

    const negocio = new TiposNegocio({
        nombre,
    })

    negocio.save((err, codigoData) => {
        if (err) {
            return res.json({
                exe: false,
                err
            })
        }

        return res.json({
            exe: true
        })
    })
})



router.get('/tiponegocio', (req, res) => {

    TiposNegocio.find({})
        .lean()
        .exec((err, negocios) => {
            if (err) {
                return res.json({
                    exe: false,
                    err
                })
            }

            return res.json({
                exe: true,
                response: negocios
            })
        })
})




module.exports = router;