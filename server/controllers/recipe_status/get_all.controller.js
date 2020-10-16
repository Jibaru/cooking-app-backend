const { RecipeStatus } = require('../../../models/index');

/// Get all RecipeStatuses
const getAllController = (req, res) => {

    RecipeStatus
    .findAll()
    .then(recipeStatus => {
        return res.json({
            ok: true,
            recipeStatus
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