const { RecipeCuisine } = require('../../../models/index');

/// Get all RecipeCuisines
const getAllController = (req, res) => {

    RecipeCuisine
    .findAll()
    .then(recipeCuisines => recipeCuisines.map(e => _.omit(e.toJSON(), _.isNull)))
    .then(recipeCuisines => {
        return res.json({
            ok: true,
            recipeCuisines
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = getAllController;