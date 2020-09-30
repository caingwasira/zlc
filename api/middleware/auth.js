const jwt = require('jsonwebtoken')

module.exports = {
    authenticate: async function(req, res, next) {

        try {
            const token = await req.query.token

            req.token = token

            //const decoded = await jwt.verify(token, 'zlc')

            return next()
        } 
        catch (error) {
            console.log(error)
            res.redirect('/users/login')
        }
    }
}