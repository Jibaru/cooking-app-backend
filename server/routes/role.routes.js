const app = require('express')();

/// Role Services
app.get('/roles', 
    require('../controllers/role/get_all.controller'));

app.get('/roles/:id',
    require('../controllers/role/get_one.controller'));

module.exports = app;