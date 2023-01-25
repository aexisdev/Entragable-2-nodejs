//? Importar express
const express = require('express');
//? importado  la instancia que creamos.
const db = require('./utils/database');
//? Importando initModels.
const initModels = require('./models/init.model');
//? importando el modelos de Users.
const Users = require('./models/users.model');
//?importando el modelos de Todos.
const Todos = require('./models/todos.model');
//?Instancia de express.
const app = express();
//?Puerto del servidor.
const PORT = 8000;
//? app.use(express.json())
app.use(express.json())


//? provando la  conexion a la base de datos.
db.authenticate()
    .then(() => console.log('Autenticacion exitosa'))
    .catch((error) => console.log(error));

initModels();

//? vamos a usar el metodo sync para sincronizar la informacion de nuestra db
db.sync({ alter: false }) //? devuelve una promesa.
    .then(() => console.log('Base de datos sincronizada...'))
    .catch((error) => console.log(error));


app.get('/', (req, res) => {
    res.status(200).json({ message: "Bienvenido al servidor" });
});

//* DEFINIENDO LAS RUTAS DE NUESTROS ENDPOINTS (de ahora en adelante ep).
//* todas las consultas de usuarios
//* localhost:800/users ==> todo para usuarios.
//* localhost:800/todos ==> todo para tareas.

//* GET a /users
app.get('/users', async (req, res) => {
    try {
        //? vamos a obtener el resultado de consultar a todos los usuarios de la DB.
        const result = await Users.findAll(); //? similar al SELECT * FROM users;
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

//TODO/ GET/ USUARIO POR ID
//* Obtener un usuario sabiendo su id.
app.get('/users/:id', async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await Users.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

//TODO/ GET/ USUARIO POR USERNAME
//* Obtener un usuario por username.
app.get('/users/username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const result = await Users.findOne({ where: { username } });//? SELECT * FROM users WHERE username = iannacus  
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});


//TODO/ POST
//* Crear un usuario.
app.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const result = await Users.create(user);
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
    }
});


//TODO/ PUT
//* Actualizar un usuario, solo podemos cambiar el password.
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; //? aqui viene un objeto y por ejemplo la propiedad {id: 2}.
        const field = req.body;
        const result = Users.update(field, {
            where: { id },
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});


//TODO/ DELETE / eliminar un usuario por id.
app.delete('/users/:id', async (req, res) => {
    try {
        //? estraemos el id.
        const { id } = req.params;
        const result = await Users.destroy({
            where: { id }
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});


//* PARTE DEL ENTREGABLE NUMERO 2.

//* Obtener todas las tareas → GET localhost:8000/
app.get('/todos', async (req, res) => {
    try {
        const result = await Todos.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//* Obtener una tarea por su id → GET localhost:8000/todos/:id
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todos.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//* Crear una nuevo todo → POST localhost:8000/todos
app.post('/todos', async (req, res) => {
    try {
        const task = req.body;
        const result = await Todos.create(task);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
//* Actualizar un todo (actualizar la propiedad isComplete) → PUT
//* localhost:8000/todos/:id
app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const field = req.body;
        const result =  Todos.update(field, {
            where: {id},
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
//* Eliminar una tarea → DELETE localhost:8000/todos
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result =await Todos.destroy({
            where: {id}
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}`);
});

//? Vamos a terminar los modelos => rapido.
//? model
//? crear las relaciones  entre los modelos/
//? les voy a ense;ar a insertar informacion desde este mismo proyecto.

//? vamos a estar haciendo los endpoints y consultas.

//? Users


//*Relaciones de las tablas
//* users/ todos ==> uno a muchos.
//* todos/ todos_categories ==> uno a muchos.
//* todos_categories/ categories ==> muchos a uno.

//* Vamos a insertar informacion en nuestra base de datos.
//* desde nuestro proyecto de node.

//* consultar la informacion con endpoints.
