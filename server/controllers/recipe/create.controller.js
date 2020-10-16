const { Recipe } = require('../../../models/index');

/// Create one Recipe
const createController = (req, res) => {

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
    .create({
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
    })
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

module.exports = createController;