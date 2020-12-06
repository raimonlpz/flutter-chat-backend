const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario'); 
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const emailExists = await Usuario.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no válidas'
            });
        }

        const usuario = new Usuario(req.body);
        
        // password encryption
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // generate JWT (jsonwebtokens)
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,            
            user: usuario,
            token
        });
    } catch (err) {
        console.log(err);
        // server error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            // not found status
            return res.status(404).json({
                ok: false,
                msg: 'Invalid credentials'
            });
        }

        // validate password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid credentials'
            });
        }

        // generate jwt
        const token = await generarJWT(usuarioDB.id);
    
        res.json({
            ok: true,
            user: usuarioDB,
            token
        });

    } catch(err) {
        console.log(err);
        // internal server error status
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}


const renewToken = async (req, res = response) => {
    const uid = req.uid;
    
    // generate new jwt
    const token = await generarJWT(uid);

    try {
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            // not found status
            return res.status(404).json({
                ok: false,
                msg: 'Invalid credentials'
            });
        }

        res.json({
            ok: true,
            user: usuario,
            token
        });

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}