const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { toResponseFormat } = require('../../utils/response_formatter');
const {
    User,
    FileData,
    Role,
    Recipe,
    UserNotification
} = require('../../../models/index');

/// Authenticate User by email (or username) and password
/// Returns a JWT for some request
const loginController = (req, res) => {

    const { email } = req.body;
    
    User
    .findOne({
        where: {
            email,
        },
        attributes: {
            exclude: [
                'roleId',
                'profileImageId',
                'password'
            ]
        },
        include: [
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
                model: Role,
                as: 'role',
            },
            {
                model: Recipe,
                as: 'storedRecipes',
                attributes: [
                    'id',
                    'title'
                ],
                through: {
                    as: 'information',
                    attributes: ['dateTimeStored']
                },
            },
            {
                model: Recipe,
                as: 'favoriteRecipes',
                attributes: [
                    'id',
                    'title'
                ],
                through: {
                    as: 'information',
                    attributes: ['dateTimeLiked']
                },
            },
            {
                model: Recipe,
                as: 'rankingRecipes',
                attributes: [
                    'id',
                    'title'
                ],
                through: {
                    as: 'information',
                    attributes: [
                        'score',
                        'timesVisited'
                    ]
                },
            },
            {
                model: Recipe,
                as: 'createdRecipes',
                attributes: [
                    'id',
                    'title'
                ]
            },
            {
                model: UserNotification,
                as: 'userNotifications',
                attributes: {
                    exclude: ['userId']
                }
            }
        ]
    })
    //.then(user => toResponseFormat(user.toJSON()))
    .then(user => {
        
        let token = jwt.sign({
            User: user
        }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRES});

        return res.json({
            ok: true,
            user,
            token
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = loginController;