const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
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
        return res.status(success.ok).json({
            ok: true,
            users
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = getAllController;