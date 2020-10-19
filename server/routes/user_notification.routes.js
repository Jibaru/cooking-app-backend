const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const { 
    createUserNotificationMiddleware,
    deleteUserNotificationMiddleware
} = require('../middlewares/user_notification.middlewares');

/// UserNotification Services
app.post('/user-notifications',
    [createUserNotificationMiddleware, validateErrors],
    require('../controllers/user_notification/create.controller'));

app.delete('/user-notifications/:id',
    [deleteUserNotificationMiddleware, validateErrors],
    require('../controllers/user_notification/delete.controller'));

module.exports = app;