const { UserNotification } = require('../../../models/index');

/// Delete one UserNotification by Id
const deleteController = (req, res) => {

    const id = req.body.id;

    UserNotification
    .destroy({
        where: {
            id
        }
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

module.exports = deleteController;