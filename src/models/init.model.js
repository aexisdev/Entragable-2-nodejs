//? vamos  a importar todos nuestros modelos creados.
const Users = require('./users.model');
const Todos = require('./todos.model');
const Categories = require('./categories.model');
const TodosCategories = require('./todo-categories.model');

const initModels = () => {

    //? vamos a crear las relaciones.
    //* hasOne ==> tiene uno solo.
    //* hasMany ==> tiene muchos.
    //* belongsTo ==> pertenece a.

    //? muchas tareas tinen un usuario.
    Todos.belongsTo(Users, {as: 'author', foreignKey:'user_id'});
    //? un usuario tiene muchas tareas.
    Users.hasMany(Todos , {as: 'task', foreignKey: 'user_id'});

    //? Relacion de muchos a muchos y tareas.
    TodosCategories.belongsTo(Todos, {as: 'task', foreignKey: 'user_id'} );
    Todos.hasMany(TodosCategories, {as: 'category', foreignKey: 'todo_id'});
    TodosCategories.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
    Categories.hasMany(TodosCategories, {as: 'task', foreignKey: 'category_id'});
    
};

module.exports = initModels;