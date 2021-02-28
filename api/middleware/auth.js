const redirectlogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/users/login')
    } else {
        next()
    }
}

const redirectDashboard = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/users/welcome')
    } else {
        next()
    }
}

module.exports.redirectlogin = redirectlogin
module.exports.redirectDashboard = redirectDashboard