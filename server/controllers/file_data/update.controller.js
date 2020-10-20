const _ = require('underscore');
const { FileData } = require('../../../models/index');

/// Update one FileData by Id
const updateController = (req, res) => {
    // Observacion: campo content
    const id = req.params.id;
    const { name, mimeType } = req.body;

    FileData
    .update({
        name,
        mimeType
    }, {
        where: {
            id
        }
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

module.exports = updateController;