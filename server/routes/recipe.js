const express = require('express');
const Recipe = require('../../models/index').Recipe;
const Step = require('../../models/index').Step;

const app = express();


app.get('/recipes', (req, res) => {

	Recipe.findAll({
        include: [
            {
                model: Step,
                as: 'steps'
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