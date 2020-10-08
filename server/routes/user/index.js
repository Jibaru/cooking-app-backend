const express = require('express');
const app = express();

/// User services
app.use(require('./login.js'));

module.exports = app;