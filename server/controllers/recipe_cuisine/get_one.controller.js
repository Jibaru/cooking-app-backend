const { RecipeCuisine } = require('../../../models/index');
const _ = require('underscore');

/// Get one RecipeCuisine by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    RecipeCuisine
    .findByPk(id)
    .then(recipeCuisine => _.omit(recipeCuisine.toJSON(), _.isNull))
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