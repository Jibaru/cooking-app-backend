const { RecipeTag } = require('../../../models/index');

/// Get one RecipeTag by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    RecipeTag
    .findByPk(id)
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

module.exports = getOneController;