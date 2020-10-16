const { IngredientCategory } = require('../../../models/index');

/// Create one IngredientCategory
const createController = (req, res) => {

    const { name, description } = req.body;

    IngredientCategory
    .create({
        name,
        description
    })
    .then(ingredientCategory => {
        return res.json({
            ok: true,
            ingredientCategory
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