const {Router} = require('express');
const {check} = require('express-validator');

// const {validarCampos} = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const {esAdminRole, tieneRole} = require('../middlewares/validar-roles')
const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares/index')

const {esRolValido, emailRegistrado, existeUsuarioPorId} = require('../helpers/db-validators');

const {usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet)
  
router.put('/:id',[
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
],usuariosPut)//:id es el parametro enviado a traves dela url para ejecutar la accion

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6}),
        check('correo', 'El correo ingresado no es valido').isEmail(),
        //check('rol', 'No e sun rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('correo').custom(emailRegistrado),
        check('rol').custom(esRolValido),
        validarCampos
],usuariosPost)

router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
],usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;