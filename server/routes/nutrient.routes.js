const app = require('express')();

/// Nutrient Services
app.post('/nutrients',
    require('../controllers/nutrient/create.controller'));

app.delete('/nutrients/:id',
    require('../controllers/nutrient/delete.controller'));

app.get('/nutrients',
    require('../controllers/nutrient/get_all.controller'));

app.get('/nutrients/:id',
    require('../controllers/nutrient/get_one.controller'));

module.exports = app;