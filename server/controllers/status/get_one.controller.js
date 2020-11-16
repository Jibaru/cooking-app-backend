const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Status, Recipe, Ingredient, Equipment, User } = require('../../../models/index');

/// Get one Status by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    Status
    .findByPk(id, {
        include: [
            {
                model: Recipe,
                as: 'recipes',
                attributes: [
                    'id',
                    'title'
                ]
            },
            {
                model: Ingredient,
                as: 'ingredients',
                attributes: [
                    'id',
                    'name'
                ]
            },
            {
                model: Equipment,
                as: 'equipments',
                attributes: [
                    'id',
                    'name'
                ]
            },
            {
                model: User,
                as: 'users',
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'email'
                ]
            },
        ]
    })
    .then(status => toResponseFormat(status.toJSON()))
    .then(status => {
        return res.status(success.ok).json({
            ok: true,
            status
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