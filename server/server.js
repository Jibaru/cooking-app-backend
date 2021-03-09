/// ===================================================
/// Server
/// ===================================================

// Enviroment process
require("dotenv").config();

// Body Parser
const bodyParser = require("body-parser");

// Express server
const app = require("express")();

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middleware
app.use(require("./routes/index"));

// Run server
app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto ${process.env.PORT}`);
});
