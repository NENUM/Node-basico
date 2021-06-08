const {validationResult} = require('express-validator');


const validarCampos =(req, res, next)=>{
        //validar los campos a traves del middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        next();
}

module.exports={
    validarCampos
}