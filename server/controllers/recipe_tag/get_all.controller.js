const { RecipeTag } = require('../../../models/index');
const _ = require('underscore');

/// Get all RecipeTags
const getAllController = (req, res) => {

    RecipeTag
    .findAll()
    .then(recipeTags => recipeTags.map(e => _.omit(e.toJSON(), _.isNull)))
    .then(recipeTags => {
        return res.json({
            ok: true,
            recipeTags
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