const express = require('express')
const cors= require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.paths={
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
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
        //Fileupload-Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));//Re define las rutas y las tipifica todas sobre la misma ruta
        this.app.use(this.paths.uploads, require('../routes/uploads'));//Re define las rutas y las tipifica todas sobre la misma ruta


    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Servidor iniciado en el puerto`, process.env.PORT)
        })
    }

}

module.exports = Server;