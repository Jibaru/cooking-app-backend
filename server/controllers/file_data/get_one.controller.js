const _ = require('underscore');
const { 
    FileData, 
    Ingredient, 
    User, 
    Equipment,
    Step,
    Recipe
} = require('../../../models/index');

/// Get one FileData by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    FileData
    .findByPk(id, {
        include: [
            {
                model: Ingredient,
                as: 'ingredients',
                attributes:[
                    'name', 
                    'description'
                ],
            },
            {
                model: User,
                as: 'user',
                attributes:[
                    'firstName', 
                    'lastName', 
                    'nickName', 
                    'email'
                ],
            },
            {
                model: Equipment,
                as: 'equipment',
                attributes:[
                    'name', 
                    'description'
                ],
            },
            {
                model: Step,
                as: 'step',
                attributes:[
                    'orderNumber', 
                    'content'
                ],
            },
            {
                model: Recipe,
                as: 'recipe',
                attributes:[
                    'title', 
                    'description', 
                    'yield', 
                    'prepTime', 
                    'cookTime', 
                    'totalTime'
                ],
            }
        ]
    })
    .then(fileData => _.omit(fileData.toJSON(), _.isNull))
    .then(fileData => {
        return res.json({
            ok: true,
            fileData
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