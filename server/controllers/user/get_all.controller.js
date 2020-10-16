const _ = require('underscore');
const { User } = require('../../../models/index');

/// Get all Users
const getAllController = (req, res) => {

    User
    .findAll({
        exclude: ['password']
    })
    .then(users => {
        return res.json({
            ok: true,
            users
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = getAllController;