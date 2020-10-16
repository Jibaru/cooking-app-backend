const { RecipeTag } = require('../../../models/index');

/// Get all RecipeTags
const getAllController = (req, res) => {

    RecipeTag
    .findAll()
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