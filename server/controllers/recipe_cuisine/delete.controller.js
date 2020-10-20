const { RecipeCuisine } = require('../../../models/index');
const _ = require('underscore');

/// Delete one RecipeCuisine by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeCuisine.findByPk(id)
    .then(recipeCuisine => {
        return recipeCuisine.destroy();
    })
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

module.exports = deleteController;