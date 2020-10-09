const jwt = require('jsonwebtoken');


let verificarToken = (req, res, next) => {

    let token = req.get('x-token');

    jwt.verify(token, process.env.SECRET, (err, decode) => {

        if (err) {
            return res.status(401).json({
                exe: false,
                message: 'Token no válido'
            })
        }

        req.usuario = decode.usuario;
    })

    next();

}

module.exports = {
    verificarToken
}