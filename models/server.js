const express = require('express')
const cors= require('cors');
const {dbConnection} = require('../database/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.paths={
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios'
        }
        
        //Conectas a base de datos
        this.conectarDb();
        //Middlewares
        this.middlewares();

        //rutas de la aplicacion
        this.routes();
    }
    async conectarDb(){
        await dbConnection();
    }

    middlewares(){//Una funcion que se ejecuta antes de llamar un controlador o seguir con la ejecucion de peticiones
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }
    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));//Re define las rutas y las tipifica todas sobre la misma ruta

    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Servidor iniciado en el puerto`, process.env.PORT)
        })
    }

}

module.exports = Server;