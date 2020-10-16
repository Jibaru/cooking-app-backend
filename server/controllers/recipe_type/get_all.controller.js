const { RecipeType } = require('../../../models/index');

/// Get all RecipeTypes
const getAllController = (req, res) => {

    RecipeType
    .findAll()
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

module.exports = getAllController;