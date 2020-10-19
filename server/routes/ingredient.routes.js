const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const { 
    createIngredientMiddleware,
    getOneIngredientMiddleware,
    updateIngredientMiddleware 
} = require('../middlewares/ingredient.middlewares');

/// Ingredient Services
app.post('/ingredients',
    [createIngredientMiddleware, validateErrors],
    require('../controllers/ingredient/create.controller'));

app.get('/ingredients',
    require('../controllers/ingredient/get_all.controller'))

app.get('/ingredients/:id', 
    [getOneIngredientMiddleware, validateErrors],
    require('../controllers/ingredient/get_one.controller'));

app.put('/ingredients/:id', 
    [updateIngredientMiddleware, validateErrors],
    require('../controllers/ingredient/update.controller'));

module.exports = app;