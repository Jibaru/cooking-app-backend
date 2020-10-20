const { Recipe } = require('../../../models/index');
const _ = require('underscore');

/// Get one Recipe by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    Recipe
    .findByPk(id)
    .then(recipe => _.omit(recipe.toJSON(), _.isNull))
    .then(recipe => {
        return res.json({
            ok: true,
            recipe
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