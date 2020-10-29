const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeType } = require('../../../models/index');

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
    .then(recipeType => toResponseFormat(recipeType.toJSON()))
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