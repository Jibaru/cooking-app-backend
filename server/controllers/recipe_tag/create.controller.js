const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeTag } = require('../../../models/index');

/// Create one RecipeTag
const createController = (req, res) => {

    const { name } = req.body;

    RecipeTag
    .create({
        name
    })
    .then(recipeTag => toResponseFormat(recipeTag.toJSON()))
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