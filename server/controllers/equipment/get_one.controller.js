const _ = require('underscore');
const { 
    Equipment,
    Instruction,
    FileData
} = require('../../../models/index');

/// Get one Equipment by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Equipment
    .findByPk(id, {
        attributes: {
            exclude: 'imageId',
        },
        include: [
            {
                model: Instruction,
                as: 'instructions',
                attributes: [
                    'id'
                ],
                through: {attributes: []},
            },
            {
                model: FileData,
                as: 'image',
                attributes: [
                    'id',
                    'content',
                    'mimeType',
                    'url'
                ]
            }
        ]
    })
    .then(equipment => _.omit(equipment.toJSON(), _.isNull))
    .then(equipment => {
        return res.json({
            ok: true,
            equipment
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