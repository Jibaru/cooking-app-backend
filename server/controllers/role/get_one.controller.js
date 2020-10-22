const { Role, User } = require('../../../models/index');
const _ = require('underscore');

/// Get one Role by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Role
    .findByPk(id, {
        include: [
            {
                model: User,
                as: 'users',
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email'
                ]
            }
        ]
    })
    .then(role => _.omit(role.toJSON(), _.isNull))
    .then(role => {
        return res.json({
            ok: true,
            role
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = getOneController;