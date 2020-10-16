const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

const { User } = require('../../../models/index');

/// Authenticate User by email (or username) and password
/// Returns a JWT for some request
const loginController = (req, res) => {

    const { email, password } = req.body;
    
    User
    .findOne({
        where: {
            email,
            password: bcrypt.hashSync(password, 10)
        }
    })
    .then(user => {
        
        let token = jwt.sign({
            User: user
        }, 'seed', {expiresIn: 60*60});

        return res.json({
            ok: true,
            user,
            token
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = loginController;