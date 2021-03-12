const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const {
  uploadFile,
  appendFilesToBody,
} = require("../middlewares/upload_file.middleware");
const { checkToken } = require("../middlewares/authentication");
const {
  onceParameterRequired,
} = require("../middlewares/once_parameter_required.middleware");
const {
  createIngredientMiddleware,
  getOneIngredientMiddleware,
  updateIngredientMiddleware,
} = require("../middlewares/ingredient.middlewares");

/// Ingredient Services
app.post(
  "/ingredients",
  [
    checkToken,
    uploadFile.single("image"),
    appendFilesToBody,
    createIngredientMiddleware,
    validateErrors,
  ],
  require("../controllers/ingredient/create.controller")
);

app.get(
  "/ingredients",
  require("../controllers/ingredient/get_all.controller")
);

app.get(
  "/ingredients/:id",
  [getOneIngredientMiddleware, validateErrors],
  require("../controllers/ingredient/get_one.controller")
);

app.put(
  "/ingredients/:id",
  [
    checkToken,
    uploadFile.single("image"),
    appendFilesToBody,
    onceParameterRequired,
    updateIngredientMiddleware,
    validateErrors,
  ],
  require("../controllers/ingredient/update.controller")
);

module.exports = app;
