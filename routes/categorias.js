const {Router} = require('express');
const {check} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria,actualizarCategoria, borrarCategoria } = require('../controllers/categoria');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const {validarJWT, validarCampos, esAdminRole} = require('../middlewares');

const router= Router();
//Crear todas las validaciones para cada ruta


//Obtener todas las categorias
router.get('/', obtenerCategorias);

//obtener categoria por id
//Crear check personalizado para buscar una categoria si ya existe(ejempleo en helpers existe Usuario por IUD)
router.get('/:id',[
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],obtenerCategoria);

//Crear categoria - privada- personas con token validado
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar por id - privado -  personas con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,actualizarCategoria);

//Borrar unicamente por admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);


module.exports=router;