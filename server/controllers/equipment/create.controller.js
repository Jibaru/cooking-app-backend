const fs = require('fs');
const path = require('path');
const assetsDir = path.resolve('resources/static/assets/images');
const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Equipment, FileData, sequelize } = require('../../../models/index');

const StatusPending = 2;

/// Create one Equipment
const createController = (req, res) => {

    const { name, description } = req.body;
    const image = req.file;
    /*const { imageId, name, description } = req.body;

    Equipment
    .create({
        imageId,
        name,
        description
    })
    .then(equipment => toResponseFormat(equipment.toJSON()))
    .then(equipment => {
        return res.status(success.created).json({
            ok: true,
            equipment
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });*/

    sequelize.transaction(t => {
        return FileData
        .create({
            name: image.originalname,
            mimeType: image.mimetype,
            content: fs.readFileSync(
                assetsDir + `\\${image.filename}`
            )
        })
        .then(fileData => {
            return Equipment
            .create({
                imageId: fileData.id,
                name,
                description,
                statusId: StatusPending
            }, {transaction: t});
        });
    })
    .then(result => {
        return res.status(success.created).json({
            ok: true,
            equipment: result
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

module.exports = createController;