const {Sequelize} = require('sequelize');

//? crear una instancia con parametros de configuracion de nuestra base de datos.
//? necesitamos un objeto de configuracion => son las credenciales de mi base de datos.
const db = new Sequelize({
    database: "todoapp",
    username: "postgres", //*postgres para ustedes.
    host: "localhost",  //* 127.0.0.1
    port: "5432",
    password: "root",
    dialect: "postgres" //* la base de datos que estamos usando.
});

//? exportar instancia para poder usarla.
module.exports = db; 
