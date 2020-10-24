const { User } = require('../../../models/index');
const _ = require('underscore');

/// Delete one User by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    User.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    })
    .then(user => {
        return user.destroy();
    })
    .then(user => _.omit(user.toJSON(), _.isNull))
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