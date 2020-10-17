const { Recipe } = require('../../../models/index');

/// Get one Recipe by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    Recipe
    .findByPk(id)
    .then(recipe => {
        return res.json({
            ok: true,
            recipe
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