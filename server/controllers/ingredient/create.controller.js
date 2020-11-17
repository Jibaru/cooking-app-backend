const fs = require('fs');
const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Ingredient, FileData, sequelize } = require('../../../models/index');

const StatusPending = 2;

/// Create one Ingredient
const createController = (req, res) => {

    const { name, description } = req.body;
    const image = req.file;

    sequelize.transaction(t => {
        return FileData
        .create({
            name: image.originalname,
            mimeType: image.mimetype,
            content: fs.readFileSync(image.path)
        }, {transaction: t})
        .then(fileData => {
            return Ingredient
            .create({
                imageId: fileData.id,
                name,
                description,
                statusId: StatusPending
            }, {transaction: t});
        });
    })
    .then(ingredient => toResponseFormat(ingredient.toJSON()))
    .then(ingredient => {
        return res.status(success.created).json({
            ok: true,
            ingredient
        });
    })
    .catch(error => {
        console.log(error);
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

    /*Ingredient
    .create({
        name,
        description,
        imageId,
        statusId: StatusPending
    })
    .then(ingredient => toResponseFormat(ingredient.toJSON()))
    .then(ingredient => {
        return res.status(success.created).json({
            ok: true,
            ingredient
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });*/

};

module.exports = createController;