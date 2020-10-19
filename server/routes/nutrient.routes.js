const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    createNutrientMiddleware,
    deleteNutrientMiddleware,
    getOneNutrientMiddleware
} = require('../middlewares/nutrient.middlewares');

/// Nutrient Services
app.post('/nutrients',
    [createNutrientMiddleware, validateErrors], 
    require('../controllers/nutrient/create.controller'));

app.delete('/nutrients/:id',
    [deleteNutrientMiddleware, validateErrors],
    require('../controllers/nutrient/delete.controller'));

app.get('/nutrients',
    require('../controllers/nutrient/get_all.controller'));

app.get('/nutrients/:id',
    [getOneNutrientMiddleware, validateErrors],
    require('../controllers/nutrient/get_one.controller'));

module.exports = app;