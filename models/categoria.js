const {Schema, model} = require('mongoose');


const CategoriaSchema = Schema({ 
    nombre:{
        type:String,
        required:[true, 'Elnombre es obligatorio'],
        unique: true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,//Llama a otro objeto que se encuentra en Mongo
        ref:'Usuario',
        required:true
    }

});

CategoriaSchema.methods.toJSON = function(){
    const {__v, estado,...data} = this.toObject();
    return data;
}

module.exports= model('Categoria', CategoriaSchema);
