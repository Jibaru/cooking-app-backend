const { RecipeType } = require('../../../models/index');

/// Get one RecipeType by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    RecipeType
    .findByPk(id)
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

module.exports = getOneController;