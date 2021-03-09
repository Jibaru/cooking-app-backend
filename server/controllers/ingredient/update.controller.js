const fs = require("fs");
const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Ingredient, FileData, sequelize } = require("../../db/models/index");

/// Update one Ingredient by Id
const updateController = (req, res) => {
  const id = req.params.id;
  const { name, description, status } = req.body;
  const image = req.file;

  sequelize
    .transaction((t) => {
      return Ingredient.update(
        {
          name,
          description,
          status,
        },
        {
          where: {
            id,
          },
          transaction: t,
        }
      )
        .then((_) => {
          return Ingredient.findByPk(id, { transaction: t });
        })
        .then((ingredient) => {
          if (!!image) {
            return FileData.findByPk(ingredient.imageId, {
              transaction: t,
            }).then((fileData) => {
              return fileData.update(
                {
                  name: image.originalname,
                  mimeType: image.mimetype,
                  content: fs.readFileSync(image.path),
                },
                {
                  transaction: t,
                }
              );
            });
          }
        });
    })
    .then((_) =>
      Ingredient.findByPk(id, {
        attributes: [
          ...(!!name ? ["name"] : []),
          ...(!!description ? ["description"] : []),
          ...(!!status ? ["status"] : []),
        ],
        include: [
          ...(!!image
            ? [
                {
                  model: FileData,
                  as: "image",
                },
              ]
            : []),
        ],
      })
    )
    .then((ingredient) => toResponseFormat(ingredient.toJSON()))
    .then((ingredient) => {
      return res.status(success.ok).json({
        ok: true,
        ingredient,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });

  /*Ingredient
    .update({
        imageId,
        name,
        description,
        statusId
    }, {
        where: {
            id
        }
    })
    .then((_) => Ingredient.findByPk(id, {
        attributes: [
            ...((!!imageId) ? ['imageId']: []),
            ...((!!name) ? ['name']: []),
            ...((!!description) ? ['description'] : []),
            ...((!!statusId) ? ['statusId'] : []),
        ]
    }))
    .then(ingredient => toResponseFormat(ingredient.toJSON()))
    .then(ingredient => {
        return res.status(success.ok).json({
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

module.exports = updateController;
