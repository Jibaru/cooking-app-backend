const { IngredientCategory } = require('../../../models/index');

/// Delete one IngredientCategory by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    IngredientCategory.findByPk(id)
    .then(ingredientCategory => {
        return ingredientCategory.destroy();
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

module.exports = deleteController;