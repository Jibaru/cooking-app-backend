const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const { checkToken } = require("../middlewares/authentication");
const {
  createRecipeTagMiddleware,
  deleteRecipeTagMiddleware,
  getOneRecipeTagMiddleware,
  getAllRecipeTagsMiddleware,
} = require("../middlewares/recipe_tag.middlewares");

/// RecipeTag Services
app.post(
  "/recipe-tags",
  [checkToken, createRecipeTagMiddleware, validateErrors],
  require("../controllers/recipe_tag/create.controller")
);

app.delete(
  "/recipe-tags/:id",
  [checkToken, deleteRecipeTagMiddleware, validateErrors],
  require("../controllers/recipe_tag/delete.controller")
);

app.get(
  "/recipe-tags",
  [getAllRecipeTagsMiddleware],
  require("../controllers/recipe_tag/get_all.controller")
);

app.get(
  "/recipe-tags/:id",
  [getOneRecipeTagMiddleware, validateErrors],
  require("../controllers/recipe_tag/get_one.controller")
);

module.exports = app;
