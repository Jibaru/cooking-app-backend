const { RecipeTag } = require('../../../models/index');
const _ = require('underscore');

/// Create one RecipeTag
const createController = (req, res) => {

    const { hash, originalName, name } = req.body;

    RecipeTag
    .create({
        hash,
        originalName,
        name
    })
    .then(recipeTag => _.omit(recipeTag.toJSON(), _.isNull))
    .then(recipeTag => {
        return res.json({
            ok: true,
            recipeTag
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = createController;