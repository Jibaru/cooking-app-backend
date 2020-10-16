const { Ingredient } = require('../../../models/index');

/// Create one Ingredient
const createController = (req, res) => {

    const { name, description, imageId } = req.body;

    Ingredient
    .create({
        name,
        description,
        imageId,
    })
    .then(ingredient => {
        return res.json({
            ok: true,
            ingredient
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