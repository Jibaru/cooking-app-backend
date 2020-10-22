const bcrypt = require('bcrypt');
const _ = require('underscore');

const { 
    User,
    FileData,
    Role
} = require('../../../models/index');

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
        return User.findByPk(user.id, {
            attributes: {
                exclude: [
                    'password',
                    'roleId',
                    'profileImageId'
                ],
            },
            include: [
                {
                    model: Role,
                    as:'role',
                },
                {
                    model: FileData,
                    as: 'profileImage',
                    attributes: [
                        'id',
                        'mimeType',
                        'content',
                        'url'
                    ]
                }
            ]
        })
    })
    .then(user => _.omit(user.toJSON(), _.isNull))
    .then(user => {
        return res.json({
            ok: true,
            user
        });
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = signinController;