const dbValidators = require('./db-validators');
const genetarJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');



module.exports={//Los ... expande las exportaciones permtitiendo llamar metodos(u otros elementos) de cada archivo
    ...dbValidators,
    ...genetarJwt,
    ...googleVerify,
    ...subirArchivo
}