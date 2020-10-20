const { RecipeTag } = require('../../../models/index');
const _ = require('underscore');

/// Delete one RecipeTag by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeTag.findByPk(id)
    .then(recipeTag => {
        return recipeTag.destroy();
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

module.exports = deleteController;