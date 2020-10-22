const { 
    Recipe,
    RecipeCuisine,
    RecipeTag,
    RecipeStatus,
    FileData,
    Instruction,
    Ingredient,
    Step,
    Equipment,
    User
} = require('../../../models/index');
const _ = require('underscore');

/// Get one Recipe by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    Recipe
    .findByPk(id, {
        attributes: {
            exclude: [
                'recipeStatusId',
                'recipeCuisineId',
                'recipeTypeId',
                'createdById',
                'instructionId'
            ]
        },
        include: [
            {
                model: User,
                as: 'createdBy',
                attributes: {
                    exclude: [
                        'password',
                        'roleId',
                        'profileImageId',
                        'email'
                    ]
                },
                include: [
                    {
                        model: FileData,
                        as: 'profileImage',
                        attributes: [
                            'id',
                            'content',
                            'mimeType',
                            'url'
                        ]
                    },
                ]
            },
            {
                model: FileData,
                as: 'recipeImage',
                attributes: [
                    'id',
                    'content',
                    'mimeType',
                    'url'
                ]
            },
            {
                model: RecipeStatus,
                as: 'recipeStatus',
            },
            {
                model: RecipeCuisine,
                as: 'recipeCuisine'
            },
            {
                model: RecipeTag,
                as: 'recipeTag',
                through: {attributes: []},
            },
            {
                model: Instruction,
                as: 'instruction',
                include: [
                    {
                        model: Ingredient,
                        as:'ingredients',
                        attributes: ['id', 'name', 'description'],
                        through: {
                            as: 'amount',
                            attributes: [
                                'value',
                                'units'
                            ],
                        },
                        include: [
                            {
                                model: FileData,
                                as: 'image',
                                attributes: [
                                    'id',
                                    'content',
                                    'mimeType',
                                    'url'
                                ]
                            },
                        ]
                    },
                    {
                        model: Equipment,
                        as:'equipments',
                        attributes: ['id', 'name', 'description'],
                        include: [
                            {
                                model: FileData,
                                as: 'image',
                                attributes: [
                                    'id',
                                    'content',
                                    'mimeType',
                                    'url'
                                ]
                            },
                        ],
                        through: {attributes: []},
                    },
                    {
                        model: Step,
                        as:'steps',
                        attributes: ['id', 'orderNumber', 'content'],
                        include: [
                            {
                                model: FileData,
                                as: 'stepImage',
                                attributes: [
                                    'id',
                                    'content',
                                    'mimeType',
                                    'url'
                                ]
                            },
                        ]
                    },
                ]
            }
        ]
    })
    .then(recipe => _.omit(recipe.toJSON(), _.isNull))
    .then(recipe => {
        return res.json({
            ok: true,
            recipe
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