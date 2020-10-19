const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const { 
    createEquipmentMiddleware,
    deleteEquipmentMiddleware,
    getOneEquipmentMiddleware,
    updateEquipmentMiddleware
} = require('../middlewares/equipment.middlewares');

/// Equipment Services
app.post('/equipments',
    [createEquipmentMiddleware, validateErrors], 
    require('../controllers/equipment/create.controller'));

app.delete('/equipments/:id',
    [deleteEquipmentMiddleware, validateErrors],
    require('../controllers/equipment/delete.controller'));

app.get('/equipments', 
    require('../controllers/equipment/get_all.controller'));

app.get('/equipments/:id',
    [getOneEquipmentMiddleware, validateErrors],
    require('../controllers/equipment/get_one.controller'));

app.put('/equipments/:id',
    [updateEquipmentMiddleware, validateErrors],
    require('../controllers/equipment/update.controller'));

module.exports = app;