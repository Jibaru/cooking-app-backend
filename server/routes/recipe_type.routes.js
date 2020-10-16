const app = require('express')();

/// RecipeType Services
app.post('/recipe-types', 
    require('../controllers/recipe_type/create.controller'));

app.delete('/recipe-types/:id',
    require('../controllers/recipe_type/delete.controller'));

app.get('/recipe-types',
    require('../controllers/recipe_type/get_all.controller'));

app.get('/recipe-types/:id',
    require('../controllers/recipe_type/get_one.controller'));

module.exports = app;