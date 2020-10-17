const { RecipeStatus } = require('../../../models/index');

/// Get one RecipeStatus by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    RecipeStatus
    .findByPk(id)
    .then(recipeStatus => {
        return res.json({
            ok: true,
            recipeStatus
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