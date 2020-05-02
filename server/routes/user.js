const express = require('express');
const User = require('../../models/index').User;

const app = express();


app.get('/users', (req, res) => {

	User.findAll()
		.then((users) => {

			res.json({
				ok: true,
				users
			});
		});

});

module.exports = app;