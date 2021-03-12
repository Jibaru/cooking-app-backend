const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const { checkToken } = require("../middlewares/authentication");
const {
  createRecipeMiddleware,
  getOneRecipeMiddleware,
  updateRecipeMiddleware,
} = require("../middlewares/recipe.middlewares");

/// Recipe Services
app.post(
  "/recipes",
  [checkToken, createRecipeMiddleware, validateErrors],
  require("../controllers/recipe/create.controller")
);

app.get("/recipes", require("../controllers/recipe/get_all.controller"));

app.get(
  "/recipes/:id",
  [getOneRecipeMiddleware, validateErrors],
  require("../controllers/recipe/get_one.controller")
);

app.put(
  "/recipes/:id",
  [checkToken, updateRecipeMiddleware, validateErrors],
  require("../controllers/recipe/update.controller")
);

module.exports = app;
