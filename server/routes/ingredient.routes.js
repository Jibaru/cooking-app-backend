const app = require('express')();

/// Ingredient Services
app.post('/ingredients',
    require('../controllers/ingredient/create.controller'));

app.get('/ingredients',
    require('../controllers/ingredient/get_all.controller'))

app.get('/ingredients/:id', 
    require('../controllers/ingredient/get_one.controller'));

app.put('/ingredients/:id', 
    require('../controllers/ingredient/update.controller'));

module.exports = app;