const express = require('express');
const app = express();

/// Base Routes
app.use(require('./user/index.js'));

module.exports = app;