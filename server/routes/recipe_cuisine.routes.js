const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    createRecipeCuisineMiddleware,
    deleteRecipeCuisineMiddleware,
    getOneRecipeCuisineMiddleware
} = require('../middlewares/recipe_cuisine.middlewares');

/// RecipeCuisine Services
app.post('/recipe-cuisines', 
    [createRecipeCuisineMiddleware, validateErrors],
    require('../controllers/recipe_cuisine/create.controller'));

app.delete('/recipe-cuisines/:id',
    [deleteRecipeCuisineMiddleware, validateErrors],
    require('../controllers/recipe_cuisine/delete.controller'));

app.get('/recipe-cuisines',
    require('../controllers/recipe_cuisine/get_all.controller'));

app.get('/recipe-cuisines/:id',
    [getOneRecipeCuisineMiddleware, validateErrors],
    require('../controllers/recipe_cuisine/get_one.controller'));

module.exports = app;