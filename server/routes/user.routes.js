const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const {
    signinUserMiddleware,
    deleteUserMiddleware,
    getOneUserMiddleware,
    updateUserMiddleware,
    loginUserMiddleware,
    getAllUsersMiddleware
} = require('../middlewares/user.middlewares');

/// User Services
app.delete('/users/:id',
    [deleteUserMiddleware, validateErrors],
    require('../controllers/user/delete.controller'));

app.get('/users',
    [getAllUsersMiddleware, validateErrors],
    require('../controllers/user/get_all.controller'));

app.get('/users/:id',
    [getOneUserMiddleware, validateErrors],
    require('../controllers/user/get_one.controller'));

app.post('/users/login', 
    [loginUserMiddleware, validateErrors],
    require('../controllers/user/login.controller'));

app.post('/users/signin',
    [signinUserMiddleware, validateErrors],
    require('../controllers/user/signin.controller'));

app.put('/users/:id',
    [updateUserMiddleware, validateErrors],
    require('../controllers/user/update.controller'));

module.exports = app;