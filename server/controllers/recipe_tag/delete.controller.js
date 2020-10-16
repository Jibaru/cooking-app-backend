const { RecipeTag } = require('../../../models/index');

/// Delete one RecipeTag by Id
const deleteController = (req, res) => {

    const id = req.body.id;

    RecipeTag
    .destroy({
        where: {
            id
        }
    })
    .then(recipeTag => {
        return res.json({
            ok: true,
            recipeTag
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = deleteController;