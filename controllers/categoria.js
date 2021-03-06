const {response, request} = require('express');
const {Categoria} = require('../models')


//Obtener categorias con el paginado, el total + el metodo populate de Moongoose(con el id devuelve la informacion del ultimo usuario)
const obtenerCategorias = async(req=request,res=response)=>{
    const {limite=5, desde=0} = req.query;
    
    const query = {estado:true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
                    .populate('usuario', 'nombre')
                    .skip(Number(desde))
                    .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias,
        //populate
    })
}

//Obtenercategoria con el populate
const obtenerCategoria = async(req, res=response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json(categoria);

}


const crearCategoria = async(req,res=response)=>{

        const nombre = req.body.nombre.toUpperCase();

        const categoriaDb = await Categoria.findOne({nombre});

        if(categoriaDb){
            return res.status(400).json({
                msg:`La categoria ${categoriaDb.nombre}, ya existe`
            })
        }

        //Generar la data a guardar
        const data={
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);

        //Guardar en BD
        await categoria.save();

        res.status(201).json(categoria)
}

//ActualizarCategoria por el nombre y el nombre debe ser unico
const actualizarCategoria =async(req,res)=>{
    const {id} = req.params
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});


    res.json({categoria})
}

//BorrarCategoria por ID, cambiar al estado false

const borrarCategoria = async(req,res=response)=>{
    const {id}=req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false}, {new:true});

    res.json({categoriaBorrada})
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}