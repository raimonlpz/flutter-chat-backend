const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // read token
    const token = req.header('x-token');

    if (!token) {
        // unauthorized
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
        
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validarJWT
}