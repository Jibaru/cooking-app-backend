const { toResponseFormat } = require('../../utils/response_formatter');
const { User, UserNotification } = require('../../../models/index');

/// Delete one User by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    User.findByPk(id, {
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: UserNotification,
                as: 'userNotifications',
                attributes: {
                    exclude: ['userId'],
                },
            }
        ],
    })
    .then(user => {
        return user.destroy();
    })
    .then(user => toResponseFormat(user.toJSON()))
    .then(user => {
        return res.json({
            ok: true,
            user
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = deleteController;