const app = require("express")();

/// Role Services
app.get("/roles", require("../controllers/role/get_all.controller"));

module.exports = app;
