const { toResponseFormat } = require('../../utils/response_formatter');
const { UserNotification } = require('../../../models/index');

/// Create one UserNotification
const createController = (req, res) => {

    const {
        subject,
        content,
        dateTimeSended,
        userId
    } = req.body;

    UserNotification
    .create({
        subject,
        content,
        dateTimeSended,
        userId
    })
    .then(userNotification => toResponseFormat(userNotification.toJSON()))
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