const { RecipeType } = require('../../../models/index');

/// Delete one RecipeType by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeType
    .destroy({
        where: {
            id
        }
    })
    .then(recipeType => {
        return res.json({
            ok: true,
            recipeType
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