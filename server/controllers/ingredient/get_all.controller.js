const { Ingredient } = require('../../../models/index');

// Get all Ingredients
const getAllController = (req, res) => {

    Ingredient
    .findAll()
    .then(ingredients => {
        return res.json({
            ok: true,
            ingredients
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