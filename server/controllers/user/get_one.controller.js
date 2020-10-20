const { User } = require('../../../models/index');
const _ = require('underscore');

/// Get one User by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    User
    .findByPk(id, {
        exclude: ['password']
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

module.exports = getOneController;