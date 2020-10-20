const { UserNotification } = require('../../../models/index');
const _ = require('underscore');

/// Create one UserNotification
const createController = (req, res) => {

    const {
        subject,
        content,
        dateTimeSended,
        dateTimeViewed,
        userId
    } = req.body;

    UserNotification
    .create({
        subject,
        content,
        dateTimeSended,
        dateTimeViewed,
        userId
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

module.exports = createController;