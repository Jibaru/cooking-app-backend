const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeCuisine } = require('../../../models/index');  

/// Get all RecipeCuisines
const getAllController = (req, res) => {

    RecipeCuisine
    .findAll()
    .then(recipeCuisines => recipeCuisines.map(e => toResponseFormat(e.toJSON())))
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