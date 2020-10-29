const { toResponseFormat } = require('../../utils/response_formatter');
const { 
    Instruction,
    Recipe,
    Ingredient,
    Equipment,
    Step
} = require('../../../models/index');

/// Get one Instruction by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Instruction
    .findByPk(id, {
        include: [
            {
                model: Recipe,
                as: 'recipe',
                attributes: ['id', 'title']
            },
            {
                model: Ingredient,
                as:'ingredients',
                attributes: ['id', 'name'],
                through: {attributes: []},
            },
            {
                model: Equipment,
                as:'equipments',
                attributes: ['id', 'name'],
                through: {attributes: []},
            },
            {
                model: Step,
                as:'steps',
                attributes: ['id', 'orderNumber', 'content'],
                
            },
        ]
    })
    .then(instruction => toResponseFormat(instruction.toJSON()))
    .then(instruction => {
        return res.json({
            ok: true,
            instruction
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