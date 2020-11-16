const express = require('express');
const app = express();

/// Base Routes
app.use(require('./equipment.routes'));
app.use(require('./file_data.routes'));
app.use(require('./ingredient.routes'));
app.use(require('./ingredient_category.routes'));
app.use(require('./instruction.routes'));
app.use(require('./nutrient.routes'));
app.use(require('./recipe.routes'));
app.use(require('./recipe_cuisine.routes'));
app.use(require('./status.routes'));
app.use(require('./recipe_store.routes'));
app.use(require('./recipe_tag.routes'));
app.use(require('./recipe_type.routes'));
app.use(require('./role.routes'));
app.use(require('./step.routes'));
app.use(require('./user.routes'));
app.use(require('./user_notification.routes'));

module.exports = app;