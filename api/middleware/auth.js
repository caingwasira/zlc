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

const express = require('express')
const session = require('express-session')

const bodyParser = require('body-parser')

const ONE_HOUR = 1000 * 60

const { 
    PORT = 3000, 
    SESS_LIFETIME = ONE_HOUR,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'xyz!Gwaka@2020#' 
} = process.env

const users = [
    {
        id: 1,
        name: 'Alex',
        email: 'alex@gmail.com',
        password: 'secret'
    },
    {
        id: 2,
        name: 'Hills',
        email: 'hills@gmail.com',
        password: 'secret'
    },
    {
        id: 3,
        name: 'Cain',
        email: 'cain@gmail.com',
        password: 'secret'
    }
]

const IN_PROD = NODE_ENV === 'production'

const app = express()

app.use(session({
    name: SESS_NAME,
    cookie: {
        maxAge: SESS_LIFETIME,  
        sameSite: true, // strict
        secure: IN_PROD 
    },
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET 
}))

app.use(bodyParser.urlencoded({
    extended: true
}))

const redirectlogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectDashboard = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

app.get('/', (req, res) => {

    const { userId } = req.session

    console.log(userId)

    console.log(req.session)
    res.send(`
       <h1>Welcome</h1>
       ${userId? `
        <a href="/dashboard">Dashboard</a>
        <form method="POST" action="/logout">
            <button>Logout</button>
        </form>
       `:`
       <a href="/login">Login</a>
       <a href="/register">Register</a>
       `}
    `)
})

app.get('/dashboard', redirectlogin, (req, res) => {

    const user = users.find( user => {
        return user.id === req.session.userId
    })
    res.send(`
        <h1>Dashboard</h1>
        <a href="/">Home</a>
        <ul>
            <li>Welcome: ${user.name}</li>
            <li>Your email: ${user.email}</li>
        </ul>
    `)
})

app.get('/login', redirectDashboard, (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
           <input type="email" name="email" placeholder="Email" required />
           <input type="password" name="password" placeholder="Password" required />
           <input type="submit" />
        </form>
        <a href="/register">Register</a>
    `)
})

app.get('/register', redirectDashboard, (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method="POST" action="/register">
           <input type="text" name="name" placeholder="Name" required />
           <input type="email" name="email" placeholder="Email" required />
           <input type="password" name="password" placeholder="Password" required />
           <input type="submit" />
        </form>
        <a href="/login">Login</a>
    `)
})

app.post('/login',redirectDashboard, (req, res) => {
    const { email, password } = req.body

    if(email && password) {
        const user = users.find( user => {
            return user.email === email && user.password === password
        })

        if(user) {
            req.session.userId = user.id
            return res.redirect('/dashboard')
        }
    }

    res.redirect('/login')
})

app.post('/register',redirectDashboard, (req, res) => {
    const { name, email, password } = req.body

    if(name && email && password) {
        const exists = users.some( user => {
            return user.email === email
        })

        if(!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }

            users.push(user)

            res.redirect('/login')
        }
    }

    res.redirect('/register')
})

app.post('/logout', redirectlogin, (req, res) => {
    req.session.destroy( err => {
        if(err) {
            return res.redirect('/dashboard')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})

app.listen(PORT, error => console.log(`Server listening on port ${PORT}`))