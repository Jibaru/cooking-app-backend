const { IngredientCategory } = require('../../../models/index');
const _ = require('underscore');

/// Get all IngredientCategories
const getAllController = (req, res) => {

    IngredientCategory
    .findAll()
    .then(ingredientCategories => ingredientCategories.map(e => _.omit(e.toJSON(), _.isNull)))
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