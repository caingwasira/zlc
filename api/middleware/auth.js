const jwt = require('jsonwebtoken')

module.exports = {
    authenticate: async function(req, res, next) {

        console.log(req.query.token)

        try {
            const token = await req.query.token

            req.token = token

            const decoded = await jwt.verify(token, 'zlc')

            if(decoded) return next()
        } 
        catch (error) {
            console.log(error)
            res.redirect('/users/login')
        }
    }
}