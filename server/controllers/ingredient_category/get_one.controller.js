const { IngredientCategory, Ingredient } = require('../../../models/index');
const _ = require('underscore');

/// Get one IngredientCategory by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    IngredientCategory
    .findByPk(id, {
        include: [
            {
                model: Ingredient,
                as: 'ingredients',
                attributes: [
                    'id', 'name'
                ],
                through: {attributes: []},
            }
        ]
    })
    .then(ingredientCategory => _.omit(ingredientCategory.toJSON(), _.isNull))
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