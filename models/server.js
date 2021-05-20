const express = require('express')
const cors= require('cors');

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //rutas de la aplicacion
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
       this.app.use(this.usuariosPath, require('../routes/usuarios'));//Re define las rutas y las tipifica todas sobre la misma ruta
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Servidor iniciado en el puerto`, process.env.PORT)
        })
    }

}

module.exports = Server;