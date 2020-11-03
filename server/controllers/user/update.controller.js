const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { User } = require('../../../models/index');

/// Update one User by Id
const updateController = (req, res) => {

    const id = req.params.id;

    const { 
        profileImageId,
        roleId,
        firstName,
        lastName,
        nickName,
        email,
    } = req.body;

    User
    .update({
        profileImageId,
        roleId,
        firstName,
        lastName,
        nickName,
        email,
    }, {
        where: {
            id
        }
    })
    .then((_) => User.findByPk(id, {
        attributes: [
            ...((!!profileImageId) ? ['profileImageId']: []),
            ...((!!roleId) ? ['roleId']: []),
            ...((!!firstName) ? ['firstName'] : []),
            ...((!!lastName) ? ['lastName']: []),
            ...((!!nickName) ? ['nickName']: []),
            ...((!!email) ? ['email'] : []),
        ]
    }))
    .then(user => toResponseFormat(user.toJSON()))
    .then(user => {
        return res.status(success.ok).json({
            ok: true,
            user
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = updateController;