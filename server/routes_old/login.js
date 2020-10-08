const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const User = require('../../models/index').User;

const app = express();

// =========================================
// Login and Get Token
// =========================================
app.post('/login', (req, res) => {
    
    let body = req.body;


    if(!body.email || !body.password){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Email or password are required'
            }
        });
    }

    User.findOne({
        where: {
            email: body.email
        },
    })
    .then(user => {

        if(!user){
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        if(!bcrypt.compareSync(body.password, user.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Incorrect password'
                }
            });
        }

        let token = jwt.sign({ user }, process.env.SEED, {
            expiresIn: process.env.TOKEN_EXPIRES
        });

        let userWithoutPassword = _.omit(user.toJSON(), 'password');

        res.json({
            ok: true,
            token,
            user: userWithoutPassword
        });

    })
});

module.exports = app;
