const express = require('express');
const { Op } = require('sequelize');

const { checkToken } = require('../middlewares/authentication');

const Recipe = require('../../models/index').Recipe;
const Step = require('../../models/index').Step;
const User = require('../../models/index').User;
const Score = require('../../models/index').Score;
const Ingredient = require('../../models/index').Ingredient;
const Tag = require('../../models/index').Tag;

const app = express();

// =========================================
// Get all recipes
// =========================================
app.get('/recipes', checkToken, (req, res) => {

    let limit = req.query.limit;
    let query = req.query.query;
    let name = req.query.name;

	Recipe.findAll({
        limit: limit,
        /*where: {
            [Op.and]: {
                [Op.like]: { 
                    name: query,
                    description: query,
                },
                [Op.like]: {
                    name: name,
                }
            }
        },*/
        include: [
            {
                model: Step,
                as: 'steps',
            },
            {
                model: Score,
                as: 'scores',
                attributes: {
                    exclude: ['userId', 'recipeId']
                },
                include: {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email',
                        'imageProfile'
                    ]
                }
            },
            {
                model: User,
                as: 'favoriteUsers',
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'imageProfile'
                ],
                // For exclude Pivot Table in response
                through: {attributes: []}
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
    })
    .catch((err) => {
        res.status(500).json({
            ok: false,
            err: {
                message: 'Internal Server Error'
            }
        });
    });

});

module.exports = app;