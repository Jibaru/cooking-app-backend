const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeCuisine } = require('../../../models/index');

/// Create one RecipeCuisine
const createController = (req, res) => {

    const {
        hash,
        originalName,
        name,
        region
    } = req.body;

    RecipeCuisine
    .create({
        hash,
        originalName,
        name,
        region
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

module.exports = createController;