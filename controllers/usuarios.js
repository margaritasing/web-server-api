const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



//Mostrar usuario
const usuariosGet = (req = request, res = response) => {  

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}


//Crear usuario
const usuariosPost = async(req, res = response) => {

    /* const { nombre, edad } = req.body; */
   
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } )   

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    //Guardar en base de datos
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario       
    });
}


//Actualizar usuario

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, correo, ...resto  } = req.body;

    //TODO validar contra db

    if (password) {         
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - usuariosPut',        
        usuario
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

//Borrar usuario
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}