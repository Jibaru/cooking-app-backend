const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const { 
    getOneFileDataMiddleware,
    updateFileDataMiddleware
} = require('../middlewares/file_data.middlewares');

/// FileData Services
app.get('/file-data/:id', 
    [getOneFileDataMiddleware, validateErrors],
    require('../controllers/file_data/get_one.controller'));

app.put('/file-data/:id', 
    [updateFileDataMiddleware, validateErrors],
    require('../controllers/file_data/update.controller'));

module.exports = app;