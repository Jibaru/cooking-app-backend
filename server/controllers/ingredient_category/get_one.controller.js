const { toResponseFormat } = require('../../utils/response_formatter');
const { IngredientCategory, Ingredient } = require('../../../models/index');

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
    .then(ingredientCategory => toResponseFormat(ingredientCategory.toJSON()))
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