const app = require('express')();

/// Step Services
app.get('/steps/:id',
    require('../controllers/step/get_one.controller'));

module.exports = app;