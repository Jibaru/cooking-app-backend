const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const { checkToken } = require("../middlewares/authentication");
const {
  createRecipeTypeMiddleware,
  deleteRecipeTypeMiddleware,
  getOneRecipeTypeMiddleware,
  getAllRecipeTypesMiddleware,
} = require("../middlewares/recipe_type.middlewares");

/// RecipeType Services
app.post(
  "/recipe-types",
  [checkToken, createRecipeTypeMiddleware, validateErrors],
  require("../controllers/recipe_type/create.controller")
);

app.delete(
  "/recipe-types/:id",
  [checkToken, deleteRecipeTypeMiddleware, validateErrors],
  require("../controllers/recipe_type/delete.controller")
);

app.get(
  "/recipe-types",
  [getAllRecipeTypesMiddleware],
  require("../controllers/recipe_type/get_all.controller")
);

app.get(
  "/recipe-types/:id",
  [getOneRecipeTypeMiddleware, validateErrors],
  require("../controllers/recipe_type/get_one.controller")
);

module.exports = app;
