const app = require('express')();

/// User Services
app.post('/user/signin', require('../controllers/user/signin.controller'));
app.post('/user/login', require('../controllers/user/login.controller'));

module.exports = app;