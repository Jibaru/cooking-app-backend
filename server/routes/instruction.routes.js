const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const {
  getOneInstructionMiddleware,
} = require("../middlewares/instruction.middlewares");

/// Instruction Services
app.get(
  "/instructions/:id",
  [getOneInstructionMiddleware, validateErrors],
  require("../controllers/instruction/get_one.controller")
);

module.exports = app;
