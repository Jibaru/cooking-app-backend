const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
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
        return res.status(success.ok).json({
            ok: true,
            recipeType
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = getOneController;