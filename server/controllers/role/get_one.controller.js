const { Role } = require('../../../models/index');

/// Get one Role by Id
const getOneController = (req, res) => {

    const id = req.body.id;
    
    Role
    .findByPk(id)
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