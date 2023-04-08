const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

 //Validar errores usando el validationResult de express-validation
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return res.status(400).json(errors)        
 }

 next();

}




module.exports = {
    validarCampos
}