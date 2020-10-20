const { Ingredient } = require('../../../models/index');
const _ = require('underscore');

// Get all Ingredients
const getAllController = (req, res) => {

    Ingredient
    .findAll()
    .then(ingredients => ingredients.map(e => _.omit(e.toJSON(), _.isNull)))
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