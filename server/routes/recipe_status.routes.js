const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    getOneRecipeStatusMiddleware
} = require('../middlewares/recipe_status.middlewares');

/// RecipeStatus Services
app.get('/recipe-statuses',
    require('../controllers/recipe_status/get_all.controller'));

app.get('/recipe-statuses/:id',
    [getOneRecipeStatusMiddleware, validateErrors],
    require('../controllers/recipe_status/get_one.controller'));

module.exports = app;