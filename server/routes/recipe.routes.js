const app = require('express')();

/// Recipe Services
app.post('/recipes',
    require('../controllers/recipe/create.controller'));

app.get('/recipes',
    require('../controllers/recipe/get_all.controller'));

app.get('/recipes/:id',
    require('../controllers/recipe/get_one.controller'));

app.put('/recipes/:id',
    require('../controllers/recipe/update.controller'));

module.exports = app;