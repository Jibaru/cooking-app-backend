const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    getOneRoleMiddleware
} = require('../middlewares/role.middlewares');

/// Role Services
app.get('/roles', 
    require('../controllers/role/get_all.controller'));

app.get('/roles/:id',
    [getOneRoleMiddleware, validateErrors],
    require('../controllers/role/get_one.controller'));

module.exports = app;