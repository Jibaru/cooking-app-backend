const { IngredientCategory } = require('../../../models/index');

/// Delete one IngredientCategory by Id
const deleteController = (req, res) => {

    const idd = req.body.id;

    IngredientCategory
    .destroy({
        where: {
            id
        }
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