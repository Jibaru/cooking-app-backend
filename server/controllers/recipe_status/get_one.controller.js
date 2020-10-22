const { RecipeStatus, Recipe } = require('../../../models/index');
const _ = require('underscore');

/// Get one RecipeStatus by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    RecipeStatus
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
    .then(recipeStatus => _.omit(recipeStatus.toJSON(), _.isNull))
    .then(recipeStatus => {
        return res.json({
            ok: true,
            recipeStatus
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