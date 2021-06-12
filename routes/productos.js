const {Router, response} = require('express');
const {check} = require('express-validator');
const {crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto} = require('../controllers/productos');
const {existeProductoPorId} = require('../helpers/db-validators');
const {validarJWT, validarCampos, esAdminRole} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id','No es un ID valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],crearProducto);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],eliminarProducto);


module.exports=router;