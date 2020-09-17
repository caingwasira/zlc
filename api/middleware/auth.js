const authenticate = (req, res, next) => {
    if(req.url === '/data/me') {
        res.redirect('/signup_home')
        next()
    }
}

module.exports = authenticate;