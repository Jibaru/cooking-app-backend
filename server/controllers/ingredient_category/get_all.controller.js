const { IngredientCategory } = require('../../../models/index');

/// Get all IngredientCategories
const getAllController = (req, res) => {

    IngredientCategory
    .findAll()
    .then(ingredientCategory => {
        return res.json({
            ok: true,
            ingredientCategory
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = getAllController;