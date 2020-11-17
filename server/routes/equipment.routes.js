const app = require('express')();
const validateErrors = require('../middlewares/validate_errors.middleware');
const { uploadFile, appendFilesToBody } = require('../middlewares/upload_file.middleware');
const { onceParameterRequired } = require('../middlewares/once_parameter_required.middleware');
const { 
    createEquipmentMiddleware,
    deleteEquipmentMiddleware,
    getOneEquipmentMiddleware,
    updateEquipmentMiddleware
} = require('../middlewares/equipment.middlewares');

/// Equipment Services
app.post('/equipments',
    [uploadFile.single("image"), appendFilesToBody, createEquipmentMiddleware, validateErrors], 
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
    [uploadFile.single("image"), appendFilesToBody, onceParameterRequired, updateEquipmentMiddleware, validateErrors],
    require('../controllers/equipment/update.controller'));

module.exports = app;