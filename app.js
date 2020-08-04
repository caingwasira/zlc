const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const app = express()

app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './api/views'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
const DataRoute = require('./api/routes/boom_sprayers')
app.use('/data', DataRoute)

app.use( (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})
app.use((error, req, res, next) => {
    res.render('404', {
        errors: error
    })
    next()
})
module.exports = app;