const { UserNotification } = require('../../../models/index');

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