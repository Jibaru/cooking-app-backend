const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../../models/index').User;

const app = express();

app.post('/signin', (req, res) => {

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
                password: bcrypt.hashSync(body.password, 10)
            })
            .then(userCreated => {

                res.status(201).json({
                    ok: true,
                    user: _.omit(userCreated.toJSON(), 'password')
                });
            });
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'The email already exists.'
                }
            })
        }
    });

});

module.exports = app;
