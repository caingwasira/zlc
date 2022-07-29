const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const Data = require('./api/routes/land_audit/data')
const Users = require('./api/routes/users/users')
const Statics = require('./api/routes/statics/statics')
const errorHandler = require('./api/middleware/errors')
const session = require('express-session')

const app = express()

const ONE_HOUR = 1000*60*60

const {
    SESS_NAME = 'sid',
    SESS_LIFETIME = ONE_HOUR,
    NODE_ENV = 'development',
    SESS_SECRET = 'xyz!Gwaka@2020'
} = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './api/views'))
hbs.registerPartials(path.join(__dirname, './api/views/partials'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)
app.use(session({
    name: SESS_NAME,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET
}))

app.use(Statics)
app.use(Data)
app.use(Users)
app.use(errorHandler)


module.exports = app;
