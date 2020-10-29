const { toResponseFormat } = require('../../utils/response_formatter');
const {
    User,
    FileData,
    Role,
    Recipe,
    UserNotification
} = require('../../../models/index');

/// Get one User by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    User
    .findByPk(id, {
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
    .then(user => toResponseFormat(user.toJSON()))
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

module.exports = getOneController;