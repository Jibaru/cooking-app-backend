const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {

    const token = req.get('token') || req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid Token'
                }
            });
        }

        req.user = decoded.user;

        next();
    })


}

const checkAdminRole = (req, res, next) => {

    let user = req.user;

    if(user.role === 'ADMINISTRATOR' || user.role === 'SUPERADMINISTRATOR'){
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'The user is not authorized to execute this operation'
            }
        });
    }

}

module.exports = {
    checkToken,
    checkAdminRole
}