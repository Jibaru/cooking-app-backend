const { toResponseFormat } = require('../../utils/response_formatter');
const {
    Step,
    Instruction,
    FileData
} = require('../../../models/index');

/// Get one Step by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    Step
    .findByPk(id, {
        attributes: {
            exclude: [
                'instructionId',
                'stepImageId'
            ]
        },
        include: [
            {
                model: Instruction,
                as: 'instruction',
                attributes: [
                    'id'
                ]
            },
            {
                model: FileData,
                as: 'stepImage',
                attributes: [
                    'id',
                    'mimeType',
                    'content',
                    'url'
                ]
            }
        ]
    })
    .then(step => toResponseFormat(step.toJSON()))
    .then(step => {
        return res.json({
            ok: true,
            step
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