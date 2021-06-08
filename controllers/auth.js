const {response} = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const {googleVerify} = require('../helpers/google-verify')

const login =async(req,res=response)=>{

    const {correo, password} = req.body;

    try {
        //Solo se puede enviar una res por bloque

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos-correo'
            })
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'Usuario / password no son correctos-estado:false'
            })
        }
        //Validar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg:'Usuario/ Password no son correctos - password'
            })
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error interno || Contacte con un administrador'
        })
    }
    
}

const googleSingin = async(req, res=response)=>{

    const {id_token} = req.body;

   
    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        //verificar si el correo ya existe
        let usuario = await Usuario.findOne({correo});
        //Creacion del usuario en caso de que no exista
        if (!usuario) {
            const data ={   
                nombre, 
                correo,
                password:':O',
                img,
                google:true

            };
            usuario= new Usuario(data);
            await usuario.save();//Se guarda el usuario
        }
        //Si el usuario esta inactivo
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        const token= await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg:'Token de google es invalido'
        })
    }
}

module.exports={
    login,
    googleSingin
}