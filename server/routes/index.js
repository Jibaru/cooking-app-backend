const express = require('express');
const app = express();

/// Base Routes
app.use(require('./user.routes'));
app.use(require('./role.routes'));

module.exports = app;