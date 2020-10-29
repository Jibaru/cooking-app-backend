const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeType } = require('../../../models/index');

/// Delete one RecipeType by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeType.findByPk(id)
    .then(recipeType => {
        return recipeType.destroy();
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

module.exports = deleteController;