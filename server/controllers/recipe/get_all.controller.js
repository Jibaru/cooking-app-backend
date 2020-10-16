const { Recipe } = require('../../../models/index');

/// Get all Recipes
const getAllController = (req, res) => {

    Recipe
    .findAll()
    .then(recipes => {
        return res.json({
            ok: true,
            recipes
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