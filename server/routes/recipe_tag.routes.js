const app = require('express')();

/// RecipeTag Services
app.post('/recipe-tags', 
    require('../controllers/recipe_tag/create.controller'));

app.delete('/recipe-tags/:id',
    require('../controllers/recipe_tag/delete.controller'));

app.get('/recipe-tags',
    require('../controllers/recipe_tag/get_all.controller'));

app.get('/recipe-tags/:id',
    require('../controllers/recipe_tag/get_one.controller'));

module.exports = app;