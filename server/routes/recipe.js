const express = require('express');
const Recipe = require('../../models/index').Recipe;
const Step = require('../../models/index').Step;
const Ingredient = require('../../models/index').Ingredient;
const Tag = require('../../models/index').Tag;

const app = express();


app.get('/recipes', (req, res) => {

	Recipe.findAll({
        include: [
            {
                model: Step,
                as: 'steps'
            },
            {
                model: Ingredient,
                as: 'ingredients',
                // For exclude Pivot Table in response
                through: {attributes: []}
            },
            {
                model: Tag,
                as: 'tags',
                // For exclude Pivot Table in response
                through: {attributes: []}
            }
        ]      
    })
    .then((recipes) => {

        res.json({
            ok: true,
            recipes
        });
    });

});

module.exports = app;