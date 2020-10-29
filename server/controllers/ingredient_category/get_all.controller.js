const { toResponseFormat } = require('../../utils/response_formatter');
const { IngredientCategory } = require('../../../models/index');

/// Get all IngredientCategories
const getAllController = (req, res) => {

    IngredientCategory
    .findAll()
    .then(ingredientCategories => ingredientCategories.map(e => toResponseFormat(e.toJSON())))
    .then(ingredientCategories => {
        return res.json({
            ok: true,
            ingredientCategories
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