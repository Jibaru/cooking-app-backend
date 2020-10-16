const { IngredientCategory } = require('../../../models/index');

/// Get one IngredientCategory by Id
const getOneController = (req, res) => {

    const id = req.body.id;

    IngredientCategory
    .findByPk(id)
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

module.exports = getOneController;