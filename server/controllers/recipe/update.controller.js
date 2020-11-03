const { toResponseFormat } = require('../../utils/response_formatter');
const { Recipe } = require('../../../models/index');

/// Update one Recipe by Id
const updateController = (req, res) => {

    const id = req.params.id;

    const {
        title,
        description,
        prepTime,
        cookTime,
        recipeImageId,
        recipeStatusId,
        instructionId,
        recipeCuisineId,
        recipeTypeId
    } = req.body;

    const yieldPersons = req.body.yield;
    
    Recipe
    .update({
        title,
        description,
        yield: yieldPersons,
        prepTime,
        cookTime,
        recipeImageId,
        recipeStatusId,
        instructionId,
        recipeCuisineId,
        recipeTypeId
    }, {
        where: {
            id
        }
    })
    .then((_) => Recipe.findByPk(id, {
        attributes: [
            ...((!!title) ? ['title']: []),
            ...((!!description) ? ['description'] : []),
            ...((!!yieldPersons) ? ['yield'] : []),
            ...((!!prepTime) ? ['prepTime'] : []),
            ...((!!cookTime) ? ['cookTime'] : []),
            ...((!!recipeImageId) ? ['recipeImageId'] : []),
            ...((!!recipeStatusId) ? ['recipeStatusId'] : []),
            ...((!!instructionId) ? ['instructionId'] : []),
            ...((!!recipeCuisineId) ? ['recipeCuisineId'] : []),
            ...((!!recipeTypeId) ? ['recipeTypeId'] : []),
        ]
    }))
    .then(recipe => toResponseFormat(recipe.toJSON()))
    .then(recipe => {
        return res.json({
            ok: true,
            recipe
        });
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = updateController;