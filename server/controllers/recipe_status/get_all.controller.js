const { RecipeStatus } = require('../../../models/index');
const _ = require('underscore');

/// Get all RecipeStatuses
const getAllController = (req, res) => {

    RecipeStatus
    .findAll()
    .then(recipeStatuses => recipeStatuses.map(e => _.omit(e.toJSON(), _.isNull)))
    .then(recipeStatuses => {
        return res.json({
            ok: true,
            recipeStatuses
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