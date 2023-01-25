//? archivo de configuracion de la base de datos.
const db = require('../utils/database');
//? modelos de usuario.
const Users = require('../models/users.model');
//? modelos de todos.
const Todos = require('../models/todos.model');


//? datos de prueba para la base de datos.
const users = [
    {username: 'Ianacus' , email: 'ian@gmail.com', password: '1234'}, //? id: 1
    {username: 'exiss' , email: 'exiss@gmail.com', password: '1234'}, //? id: 2
    {username: 'cus' , email: 'cus@gmail.com', password: '1234'},//? id: 3
];

const todos = [
    {title: 'tarea 1', description: 'Descripcion de 1', userId: 1}, 
    {title: 'tarea 2', description: 'Descripcion de 2', userId: 1},
    {title: 'tarea imposible', userId: 2},
    {title: 'tarea XD', description: 'Descripcion de 1', userId: 3}
];

//? aqui estamos sincronizando de nuevo la base de datos.

//? create 
//? findOne, findAll, findByPk
//? update
//? destroy

db.sync({force: true})
    .then(() => {
        console.log('Iniciando con el sembradio malicioso xd');
        users.forEach((user) => Users.create(user)); 
        setTimeout(() => {
            todos.forEach((todos) => Todos.create(todos)); 
        }, 100)
    })
    .catch( error => console.log(error));
// const categories = [

// ];

// const  todosCategories = [

// ];               