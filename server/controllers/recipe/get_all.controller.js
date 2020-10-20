const { Recipe } = require('../../../models/index');
const _ = require('underscore');

/// Get all Recipes
const getAllController = (req, res) => {

    Recipe
    .findAll()
    .then(recipes => recipes.map(e => _.omit(e.toJSON(), _.isNull)))
    .then(recipes => {
        return res.json({
            ok: true,
            recipes
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