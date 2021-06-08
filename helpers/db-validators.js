const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async(rol='')=>{//Validacion personalizada
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailRegistrado = async(correo='')=>{
 const existeEmail = await Usuario.findOne({correo});//Verificar si el correo existe
    if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya se encuentra registrado`)
}
}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);//Verificar si el correo existe
       if (!existeUsuario) {
       throw new Error(`El id no existe: ${id}`)
   }
}

//Validaciones de categorias
const existeCategoriaPorId = async(id)=>{
    const existeCategoria = await Categoria.findById(id);//Verificar si el correo existe
       if (!existeCategoria) {
       throw new Error(`El id no existe: ${id}`)
   }
}

module.exports={
    esRolValido,
    emailRegistrado,
    existeUsuarioPorId,
    existeCategoriaPorId
}