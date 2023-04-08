const { Router } = require('express');
const Role = require('../models/role')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor a 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async (rol = '') => {
        const existeRol = await Role.findOne({rol})
        if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la db`)            
        }
    }),
    validarCampos
], usuariosPost );

router.delete('/:id', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;