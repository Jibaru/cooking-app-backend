const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    getOneStatusMiddleware
} = require('../middlewares/status.middlewares');

/// Status Services
app.get('/statuses',
    require('../controllers/status/get_all.controller'));

app.get('/statuses/:id',
    [getOneStatusMiddleware, validateErrors],
    require('../controllers/status/get_one.controller'));

module.exports = app;