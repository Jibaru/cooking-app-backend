const app = require("express")();
const validateErrors = require("../middlewares/validate_errors.middleware");
const { checkToken } = require("../middlewares/authentication");
const {
  createIngredientCategoryMiddleware,
  deleteIngredientCategoryMiddleware,
  getOneIngredientCategoryMiddleware,
} = require("../middlewares/ingredient_category.middlewares");

/// IngredientCategory Services
app.post(
  "/ingredient-categories",
  [checkToken, createIngredientCategoryMiddleware, validateErrors],
  require("../controllers/ingredient_category/create.controller")
);

app.delete(
  "/ingredient-categories/:id",
  [checkToken, deleteIngredientCategoryMiddleware, validateErrors],
  require("../controllers/ingredient_category/delete.controller")
);

app.get(
  "/ingredient-categories",
  require("../controllers/ingredient_category/get_all.controller")
);

app.get(
  "/ingredient-categories/:id",
  [getOneIngredientCategoryMiddleware, validateErrors],
  require("../controllers/ingredient_category/get_one.controller")
);

module.exports = app;
