const express = require('express');
const app = express();

app.use(require('./login.js'));
app.use(require('./user.js'));
app.use(require('./recipe.js'));
app.use(require('./ingredient.js'));

module.exports = app;
