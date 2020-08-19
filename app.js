const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './api/views'))
hbs.registerPartials(path.join(__dirname, './api/views/partials'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
const Data = require('./api/routes/boom_sprayers')
app.use(Data)

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