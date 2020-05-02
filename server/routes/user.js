const express = require('express');
const User = require('../../models/index').User;
const Score = require('../../models/index').Score;
const Recipe = require('../../models/index').Recipe;

const app = express();


app.get('/users', (req, res) => {

	User.findAll({
		include: {
			model: Score,
			as: 'scores',
			attributes: {
				exclude: ['userId', 'recipeId']
			},
			include: {
				model: Recipe,
				as: 'recipe',
				attributes: [
					'name',
					'description'
				]
			}
		}
	})
		.then((users) => {

			res.json({
				ok: true,
				users
			});
		});

});

module.exports = app;