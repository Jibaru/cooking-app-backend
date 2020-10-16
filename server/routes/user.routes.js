const app = require('express')();

/// User Services
app.delete('/users/:id',
    require('../controllers/user/delete.controller'));

app.get('/users',
    require('../controllers/user/get_all.controller'));

app.get('/users/:id',
    require('../controllers/user/get_one.controller'));

app.post('/users/login', 
    require('../controllers/user/login.controller'));

app.post('/users/signin', 
    require('../controllers/user/signin.controller'));

app.put('/users/:id',
    require('../controllers/user/update.controller'));

module.exports = app;