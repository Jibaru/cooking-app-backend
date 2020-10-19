const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    getOneStepMiddleware
} = require('../middlewares/step.middlewares');

/// Step Services
app.get('/steps/:id',
    [getOneStepMiddleware, validateErrors],
    require('../controllers/step/get_one.controller'));

module.exports = app;