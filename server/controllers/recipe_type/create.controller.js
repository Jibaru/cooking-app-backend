const { RecipeType } = require('../../../models/index');
const _ = require('underscore');

/// Create one RecipeType
const createController = (req, res) => {

    const {
        hash,
        originalName,
        name,
        description
    } = req.body;

    RecipeType
    .create({
        hash,
        originalName,
        name,
        description
    })
    .then(recipeType => _.omit(recipeType.toJSON(), _.isNull))
    .then(recipeType => {
        return res.json({
            ok: true,
            recipeType
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