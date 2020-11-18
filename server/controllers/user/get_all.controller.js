const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { User, Sequelize, sequelize } = require('../../../models/index');

/// Get all Users
const getAllController = (req, res) => {
    const Op = Sequelize.Op;

    const { 
        firstName,
        lastName,
        fromCreatedAt,
        toCreatedAt,
        roleId,
        statusId,
        offset,
        limit,
        minCreatedRecipes,
        maxCreatedRecipes,
        minFavoriteRecipes,
        maxFavoriteRecipes,
        minStoredRecipes,
        maxStoredRecipes,
    } = req.query;

    User
    .findAll({
        attributes: {
            exclude: ['password'],
            include: [
                'createdAt',
                [
                    sequelize.literal(
                        '(SELECT COUNT(*) FROM RecipeStores WHERE RecipeStores.userId = User.id)'
                    ), 
                    'countStoredRecipes'
                ],
                [
                    sequelize.literal(
                        '(SELECT COUNT(*) FROM RecipeFavorites WHERE RecipeFavorites.userId = User.id)'
                    ), 
                    'countFavoriteRecipes'
                ],
                [
                    sequelize.literal(
                        '(SELECT COUNT(*) FROM Recipes WHERE Recipes.createdById = User.id)'
                    ), 
                    'countCreatedRecipes'
                ],
            ],
        },
        where: {
            // Filter firstName%
            ...firstName && {
                firstName: {
                    [Op.startsWith]: firstName,
                },
            },
            // Filter lastName%
            ...lastName && {
                lastName: {
                    [Op.startsWith]: lastName,
                },
            },
            // Filter from X to Y createdAt
            ...(fromCreatedAt || toCreatedAt) && {
                createdAt: {
                    ...fromCreatedAt && {
                        [Op.gte]: fromCreatedAt,
                    },
                    ...toCreatedAt && {
                        [Op.lte]: toCreatedAt,
                    },
                },
            },
            // Filter roleId
            ...roleId && {
                roleId: {
                    [Op.eq]: roleId
                },
            },
            // Filter statusId
            ...statusId && {
                statusId: {
                    [Op.eq]: statusId
                }
            },
        },
        group: ['id'],
        having: {
            ...(minStoredRecipes || maxStoredRecipes) && {
                countStoredRecipes: {
                    ...minStoredRecipes && {
                        [Op.gte]: minStoredRecipes,
                    },
                    ...maxStoredRecipes && {
                        [Op.lte]: maxStoredRecipes,
                    },
                }
            },
            ...(minCreatedRecipes || maxCreatedRecipes) && {
                countCreatedRecipes: {
                    ...minCreatedRecipes && {
                        [Op.gte]: minCreatedRecipes,
                    },
                    ...maxCreatedRecipes && {
                        [Op.lte]: maxCreatedRecipes,
                    },
                }
            },
            ...(minFavoriteRecipes || maxFavoriteRecipes) && {
                countFavoriteRecipes: {
                    ...minFavoriteRecipes && {
                        [Op.gte]: minFavoriteRecipes,
                    },
                    ...maxFavoriteRecipes && {
                        [Op.lte]: maxFavoriteRecipes,
                    },
                }
            },
        },
        ...offset && {
            offset: offset
        },
        ...limit && {
            limit: limit
        },
        order: [
            [
                'createdAt', 'DESC'
            ]
        ]
    })
    .then(users => users.map(e => toResponseFormat(e.toJSON())))
    .then(users => {
        return res.status(success.ok).json({
            ok: true,
            users
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

module.exports = getAllController;