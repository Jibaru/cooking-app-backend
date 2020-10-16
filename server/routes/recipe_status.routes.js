const app = require('express')();

/// RecipeStatus Services
app.get('/recipe-statuses',
    require('../controllers/recipe_status/get_all.controller'));

app.get('/recipe-statuses/:id',
    require('../controllers/recipe_status/get_one.controller'));

module.exports = app;