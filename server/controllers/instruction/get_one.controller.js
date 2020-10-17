const { Instruction } = require('../../../models/index');

/// Get one Instruction by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Instruction
    .findByPk(id)
    .then(instruction => {
        return res.json({
            ok: true,
            instruction
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