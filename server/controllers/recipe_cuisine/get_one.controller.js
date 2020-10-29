const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeCuisine, Recipe } = require('../../../models/index');

/// Get one RecipeCuisine by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    RecipeCuisine
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
    .then(recipeCuisine => toResponseFormat(recipeCuisine.toJSON()))
    .then(recipeCuisine => {
        return res.json({
            ok: true,
            recipeCuisine
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