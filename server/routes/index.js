const express = require('express');
const app = express();

app.use(require('./user.js'));
app.use(require('./recipe.js'));

module.exports = app;
