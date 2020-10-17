const { RecipeCuisine } = require('../../../models/index');

/// Delete one RecipeCuisine by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeCuisine
    .destroy({
        where: {
            id
        }
    })
    .then(recipeCuisine => {
        return res.json({
            ok: true,
            recipeCuisine
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