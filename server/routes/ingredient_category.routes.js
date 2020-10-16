const app = require('express')();

/// IngredientCategory Services
app.post('/ingredient-categories',
    require('../controllers/ingredient_category/create.controller'));

app.delete('/ingredient-categories/:id',
    require('../controllers/ingredient_category/delete.controller'));

app.get('/ingredient-categories',
    require('../controllers/ingredient_category/get_all.controller'))

app.get('/ingredient-categories/:id', 
    require('../controllers/ingredient_category/get_one.controller'));

module.exports = app;