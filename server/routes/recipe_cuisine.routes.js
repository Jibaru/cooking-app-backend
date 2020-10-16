const app = require('express')();

/// RecipeCuisine Services
app.post('/recipe-cuisines', 
    require('../controllers/recipe_cuisine/create.controller'));

app.delete('/recipe-cuisines/:id',
    require('../controllers/recipe_cuisine/delete.controller'));

app.get('/recipe-cuisines',
    require('../controllers/recipe_cuisine/get_all.controller'));

app.get('/recipe-cuisines/:id',
    require('../controllers/recipe_cuisine/get_one.controller'));

module.exports = app;