const _ = require('underscore');
const { RecipeType } = require('../../../models/index');

/// Get all RecipeTypes
const getAllController = (req, res) => {

    RecipeType
    .findAll()
    .then(recipeTypes => recipeTypes.map(e => _.omit(e.toJSON(), _.isNull)))
    .then(recipeTypes => {
        return res.json({
            ok: true,
            recipeTypes
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