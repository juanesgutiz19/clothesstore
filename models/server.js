const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.productsPath = '/api/products';

        // Conexión a BD 
        this.mongoConnection();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }


    async mongoConnection() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // for parsing application/json
        this.app.use(express.json()); 

    
        // Directorio Público
        this.app.use( express.static('public') );

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use( this.productsPath, require('../routes/products'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
