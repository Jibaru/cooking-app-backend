const bcrypt = require('bcrypt');
const { toResponseFormat } = require('../../utils/response_formatter');
const { generateRandomString } = require('../../utils/random');
const { success, clientError } = require('../../utils/http_status_codes');
const { 
    User,
    FileData,
    Role,
    Status
} = require('../../../models/index');

const RoleEnum = Object.freeze({ superAdmin: 1, admin: 2, normal: 3, ban: 4 });
const StatusPending = 2;

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
        statusId: StatusPending,
        verificationCode: generateRandomString(6),
        profileImageId,
        firstName,
        lastName,
        nickName,
        email,
        password: bcrypt.hashSync(password, 10),
    })
    .then(user => {
        return User.findByPk(user.id, {
            attributes: {
                exclude: [
                    'password',
                    'roleId',
                    'profileImageId',
                    'statusId',
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
                },
                {
                    model: Status,
                    as: 'status',
                }
            ]
        })
    })
    .then(user => toResponseFormat(user.toJSON()))
    .then(user => {
        return res.status(success.created).json({
            ok: true,
            user
        });
    })
    .catch(error => {
        console.log(error);
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = signinController;