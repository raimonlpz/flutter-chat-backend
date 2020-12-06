/* 
@path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Email inválido').not().isEmpty().isEmail(),
    check('password', 'Contraseña obligatoria').not().isEmpty(),
    validarCampos
], crearUsuario);


router.post('/', [
    check('email', 'Email inválido').not().isEmpty().isEmail(),
    check('password', 'Contraseña obligatoria').not().isEmpty(),
    validarCampos
], loginUsuario);

// validarJWT
router.get('/renew', validarJWT, renewToken);

module.exports = router;


