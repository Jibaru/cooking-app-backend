const _ = require('underscore');
const { 
    Ingredient,
    Nutrient,
    IngredientCategory,
    Instruction,
    FileData
} = require('../../../models/index');

/// Get one Ingredient by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Ingredient
    .findByPk(id, {
        include: [
            {
                model: Nutrient,    
                as: 'nutrients',
                attributes: [
                    'id', 'name'
                ],
                through: {
                    as: 'amount',
                    attributes: ['units','value']
                },
            },
            {
                model: IngredientCategory,
                as: 'ingredientCategories',
                attributes: [
                    'id', 'name', 'description'
                ],
                through: {attributes: []},
            },
            {
                model: FileData,
                as: 'image',
                attributes: [
                    'id',
                    'content',
                    'mimeType',
                    'url'
                ],
            },
            {
                model: Instruction,
                as: 'instructions',
                attributes: ['id'],
                through: {attributes: []},
            },
        ]
    })
    .then(ingredient => _.omit(ingredient.toJSON(), _.isNull))
    .then(ingredient => {
        return res.json({
            ok: true,
            ingredient
        });
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = getOneController;