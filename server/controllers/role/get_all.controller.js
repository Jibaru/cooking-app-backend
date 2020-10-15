const { Role } = require('../../../models/index');

const getAllController = (req, res) => {

    Role
    .findAll()
    .then(roles => {
        return res.json({
            ok: true,
            roles
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });


};

module.exports = getAllController;