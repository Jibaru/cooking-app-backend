const express = require('express');
const Recipe = require('../../models/index').Recipe;
const Ingredient = require('../../models/index').Ingredient;

const app = express();


app.get('/ingredients', (req, res) => {

	Ingredient.findAll({
        include: [
            {
                model: Recipe,
                attributes: ['id', 'name'],
                as: 'recipes',
                // For exclude Pivot Table in response
                through: {attributes: []}
            }
        ]      
    })
    .then((ingredients) => {

        res.json({
            ok: true,
            ingredients
        });
    });

});

module.exports = app;