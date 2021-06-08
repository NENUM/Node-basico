const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT=async(req=request,res=response,next)=>{
    const token=req.header('x-token');//El nombre con el cual el Front-end valida el token
    if (!token) {
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);//verifica la firma del token
        //Lee el usuario que corresponde con el uid
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg:'Token no valido-usuario no existe en la base de datos'
            })
        }
        //verificar si el uid esta activo=true
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Token no valido-usuadio en estado:false'
            })
        }
        req.usuario=usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }
    
    
}

module.exports={
    validarJWT
}