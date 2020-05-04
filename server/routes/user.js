const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { checkToken, checkAdminRole } = require('../middlewares/authentication');

const User = require('../../models/index').User;
const Score = require('../../models/index').Score;
const Recipe = require('../../models/index').Recipe;

const app = express();

// =========================================
// Get all users
// =========================================
app.get('/users', checkToken, (req, res) => {

	User.findAll({
		include: [
			{
				model: Score,
				as: 'scores',
				attributes: {
					exclude: ['userId', 'recipeId']
				},
				include: {
					model: Recipe,
					as: 'recipe',
					attributes: [
						'id',
						'name',
						'description'
					]
				}
			},
			{
				model: Recipe,
				as: 'favoriteRecipes',
				attributes: [
					'id',
					'name',
					'description'
				],
				// For exclude Pivot Table in response
                through: {attributes: []}
			}
		]
	})
	.then((users) => {

		res.json({
			ok: true,
			users: users.map( user => _.omit(user.toJSON(), 'password'))
		});
	});

});

// =========================================
// Create User
// =========================================
app.post('/users', [checkToken, checkAdminRole], (req, res) => {

	const body = req.body;

    if(!body.firstName || !body.lastName || !body.email || !body.password){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The fields firstName, lastName, email and password are required'
            }
        });
	}
	
	User.findOne({
        where: {
            email: body.email
        }
    })
    .then((user) => {
        if(!user){
            User.create({
                firstName: body.firstName,
                lastName: body.lastName,
				email: body.email,
				role: body.role,
				imageProfile: body.imageProfile,
                password: bcrypt.hashSync(body.password, 10)
            })
            .then(userCreated => {

                res.status(201).json({
                    ok: true,
                    user: _.omit(userCreated.toJSON(), 'password')
                });
			})
			.catch((err) => {
				res.status(400).json({
					ok: false,
					err: {
						message: err.errors[0].message
					}
				})
			});
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'The email already exists.'
                }
            })
        }
	})
	.catch(err => {
		res.status(400).json({
			ok: false,
			err: {
				message: err.errors[0].message
			}
		});
	});
});


module.exports = app;