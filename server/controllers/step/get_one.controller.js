const { Step } = require('../../../models/index');

/// Get one Step by Id
const getOneController = (req, res) => {

    const id = req.params.id;
    
    Step
    .findByPk(id)
    .then(step => {
        return res.json({
            ok: true,
            step
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