const errorHandler = ((req, res, next) => {
    const error = new Error();
    error.status = 404;
    if(error.status) {
        res.render('404', { title: 'Not found'})
    } else if(error.status === 500) {
        res.render('404', {
            title: 'Error on our side, please try back later'
        }) 
    } else {
        next()
    }
})

module.exports = errorHandler