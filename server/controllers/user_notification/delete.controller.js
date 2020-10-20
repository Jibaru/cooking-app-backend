const { UserNotification } = require('../../../models/index');
const _ = require('underscore');

/// Delete one UserNotification by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    UserNotification.findByPk(id)
    .then(userNotification => {
        return userNotification.destroy();
    })
    .then(userNotification => _.omit(userNotification.toJSON(), _.isNull))
    .then(userNotification => {
        return res.json({
            ok: true,
            userNotification
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