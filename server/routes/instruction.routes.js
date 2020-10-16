const app = require('express')();

/// Instruction Services
app.get('/instructions/:id', 
    require('../controllers/instruction/get_one.controller'));

module.exports = app;