const { FileData } = require('../../../models/index');

/// Get one FileData by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    FileData
    .findByPk(id)
    .then(fileData => {
        return res.json({
            ok: true,
            fileData
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