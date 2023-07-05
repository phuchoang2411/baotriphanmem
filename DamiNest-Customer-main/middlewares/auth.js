const queryString = require('query-string')

const requiredLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send({
        "status": "fail",
        "message": "You are not logged in",
    })
}

const notRequiredLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.object({"status": "success", "message": "You are already logged in"})
    }
    next()
}

const requiredLoginWithBoom = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    res.boom.unauthorized()
}

module.exports = {
    requiredLogin,
    notRequiredLogin,
    requiredLoginWithBoom
}
