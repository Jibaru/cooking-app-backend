const app = require('express')();

/// UserNotification Services
app.post('/user-notifications',
    require('../controllers/user_notification/create.controller'));

app.delete('/user-notifications/:id',
    require('../controllers/user_notification/delete.controller'));

module.exports = app;