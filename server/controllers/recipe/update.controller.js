const { toResponseFormat } = require('../../utils/response_formatter');
const { Recipe } = require('../../../models/index');

/// Update one Recipe by Id
const updateController = (req, res) => {

    const id = req.params.id;

    const {
        dateTimePublished,
        title,
        description,
        yield,
        prepTime,
        cookTime,
        recipeImageId,
        recipeStatusId,
        instructionId,
        createdById,
        recipeCuisineId,
        recipeTypeId
    } = req.body;
    
    Recipe
    .update({
        dateTimePublished,
        title,
        description,
        yield,
        prepTime,
        cookTime,
        recipeImageId,
        recipeStatusId,
        instructionId,
        createdById,
        recipeCuisineId,
        recipeTypeId
    }, {
        where: {
            id
        }
    })
    .then(recipe => toResponseFormat(recipe.toJSON()))
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

module.exports = updateController;