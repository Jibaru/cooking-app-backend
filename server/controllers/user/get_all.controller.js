const { toResponseFormat } = require('../../utils/response_formatter');
const { User } = require('../../../models/index');

/// Get all Users
const getAllController = (req, res) => {

    User
    .findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then(users => users.map(e => toResponseFormat(e.toJSON())))
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