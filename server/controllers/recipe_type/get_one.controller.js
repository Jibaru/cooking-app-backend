const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeType, Recipe } = require('../../../models/index');

/// Get one RecipeType by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    RecipeType
    .findByPk(id, {
        include: [
            {
                model: Recipe,
                as: 'recipes',
                attributes: [
                    'id',
                    'title'
                ]
            }
        ]
    })
    .then(recipeType => toResponseFormat(recipeType.toJSON()))
    .then(recipeType => {
        return res.json({
            ok: true,
            recipeType
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