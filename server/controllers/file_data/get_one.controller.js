const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
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
                    'id',
                    'name', 
                    'description'
                ],
            },
            {
                model: User,
                as: 'user',
                attributes:[
                    'id',
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
                    'id',
                    'name', 
                    'description'
                ],
            },
            {
                model: Step,
                as: 'step',
                attributes:[
                    'id',
                    'orderNumber', 
                    'content'
                ],
            },
            {
                model: Recipe,
                as: 'recipe',
                attributes:[
                    'id',
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
    .then(fileData => toResponseFormat(fileData.toJSON()))
    .then(fileData => {
        return res.status(success.ok).json({
            ok: true,
            fileData
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = getOneController;