const bcrypt = require('bcrypt');
const _ = require('underscore');

const { User } = require('../../../models/index');

const RoleEnum = Object.freeze({ superAdmin: 1, admin: 2, normal: 3, ban: 4 });

/// Create one User with NORMAL Role
/// Default imageProfile, and no username is not provided
const signinController = (req, res) => {

    const {
        profileImageId,
        firstName,
        lastName,
        nickName,
        email,
        password 
    } = req.body;

    User.create({
        roleId: RoleEnum.normal,
        profileImageId,
        firstName,
        lastName,
        nickName,
        email,
        password: bcrypt.hashSync(password, 10)
    })
    .then(user => {
        return res.json({
            ok: true,
            user: _.omit(user.toJSON(), 'password')
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = signinController;