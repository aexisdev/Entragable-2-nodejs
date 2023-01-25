//? instancia para la base de datos.
const db = require('../utils/database');
//? tipos de datos de sequelize.
const {DataTypes} = require('sequelize');

//? definir el modelo de usuarios.
//? los modelos se definen con una mayuscula.

//? este modelo acepta dos parametros.
//? el primero el nombre de la tabla
//? el segundo los atributos de las tablas esto dentro de un objeto. 
const Users = db.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
});

module.exports = Users;
