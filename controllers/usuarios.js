const {response, request} = require('express')

const usuariosGet = (req=request, res = response) => {
    const {q, nombre='Sin nombre', apikey, page=1, limit=10} = req.query;
    res.json({
        msg:'Get API-controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg:'Put API-controlador',
        id
    })
}

const usuariosPost = (req, res=response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg:'Post API-controlador',
        nombre,
        edad
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg:'Delete API-controlador'
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg:'Patch API-controlador'
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}