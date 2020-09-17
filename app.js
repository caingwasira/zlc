const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const Data = require('./api/routes/boom_sprayers')
const Users = require('./api/routes/users')
const errorHandler = require('./api/middleware/errors')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './api/views'))
hbs.registerPartials(path.join(__dirname, './api/views/partials'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(Data)
app.use(Users)
app.use(errorHandler)


module.exports = app;