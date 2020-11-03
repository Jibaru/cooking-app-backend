const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeTag, Recipe } = require('../../../models/index');

/// Get one RecipeTag by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    RecipeTag
    .findByPk(id, {
        include: [
            {
                model: Recipe,
                as: 'recipes',
                attributes: [
                    'id',
                    'title'
                ],
                through: {attributes: []},
            }
        ]
    })
    .then(recipeTag => toResponseFormat(recipeTag.toJSON()))
    .then(recipeTag => {
        return res.status(success.ok).json({
            ok: true,
            recipeTag
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