const { User } = require('../../../models/index');

/// Update one User by Id
const updateController = (req, res) => {

    const { 
        profileImageId,
        roleId,
        firstName,
        lastName,
        nickName,
        email,
        password,
        id  
    } = req.body;

    User
    .update({
        profileImageId,
        roleId,
        firstName,
        lastName,
        nickName,
        email,
        password     
    }, {
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

module.exports = updateController;