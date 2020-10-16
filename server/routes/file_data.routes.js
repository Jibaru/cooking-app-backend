const app = require('express')();

/// FileData Services
app.get('/file-data/:id', 
    require('../controllers/file_data/get_one.controller'));

app.put('/file-data/:id', 
    require('../controllers/file_data/update.controller'));

module.exports = app;