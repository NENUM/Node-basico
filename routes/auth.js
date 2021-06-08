const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {login, googleSingin} = require('../controllers/auth');

const router= Router();

router.post('/login', [
    check('correo', 'El correo es invalido').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').isEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token', 'El id token es olbigatorio').not().isEmpty(),
    validarCampos
],googleSingin);
module.exports=router;