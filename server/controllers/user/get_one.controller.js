const { User } = require('../../../models/index');

/// Get one User by Id
const getOneController = (req, res) => {

    const id = req.body.id;
    
    User
    .findByPk(id, {
        exclude: ['password']
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

module.exports = getOneController;