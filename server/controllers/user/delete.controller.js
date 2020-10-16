const { User } = require('../../../models/index');

/// Delete one User by Id
const deleteController = (req, res) => {

    const id = req.body.id;

    User
    .destroy({
        where: {
            id
        }
    })
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