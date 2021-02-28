const express = require('express')
const fs = require('fs').promises
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const auth = require('../../middleware/auth')
const { json } = require('body-parser')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')


// Welcome users

router.get('/users/welcome', auth.redirectlogin, async (req, res) => {
    const user = await User.findOne({ where: { userID: req.session.userId }})

    res.render('welcome', {
        name: user.dataValues.fullName
    });
})

// Sign Up View Endpoint
router.get('/users/sys-admin', auth.redirectlogin, async (req, res) => {
    const user = await User.findOne({ where: { userID: req.session.userId }})

    if(user.dataValues.email === 'admin@orelle.com') return res.render('signup')
    res.redirect('/users/welcome')
})

router.post('/signup', auth.redirectDashboard, async (req, res, next) => {
    try {
        const { fullName, email, role, department, zlc_code, mobile_number, password } = req.body

        const userID = Math.floor(Math.random() * 1000000).toString()

        const hash = await bcrypt.hashSync(password, 10)

        let errors = []

        const jsonCodes = await fs.readFile('./api/codes/codes.json', 'utf8')

        const codes = await JSON.parse(jsonCodes)

        const match = await codes.filter(dept => zlc_code === dept.code)

        const user = await User.findAll({ attributes: ['email', 'fullName', 'department', 'userID'] })

        const limit = user.filter(user => user.dataValues.department === department)

        if (limit.length === 5) return res.send({ message: 'Users limit reached for your department'})

        const userExist = user.map(user => {
            if (user.dataValues.email === email || user.dataValues.fullName === fullName) {
                return 'User already exist';
            }
        })

        if (userExist[0] !== undefined) return res.send({ message: userExist[0]})


        if (userID.length !== 6) return res.send({ message: 'Something went wrong, try again'})

        if (match.length < 1
            || department.substring(0, 3).toUpperCase() !== match[0].code.substring(0, 3).toUpperCase()) {
                return res.send({ message: 'Oops! wrong code'})
        }

        const userN = await new User({
            userID,
            fullName,
            email,
            role,
            department,
            mobile_number,
            date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
            password: hash
        })

        await userN.save()
        res.send({
            message: 'Success! You can now login',
            status: 200
        })
    }
    catch (error) {
        console.log(error)
    }
})


// Sign In View Endpoint
router.get('/users/login', auth.redirectDashboard, async (req, res) => {
    res.render('login')
})

router.post('/users/login', auth.redirectDashboard, async (req, res) => {
    const { id, code, password } = req.body

    try {

        const jsonCodes = await fs.readFile('./api/codes/codes.json', 'utf8')

        const codes = await JSON.parse(jsonCodes)

        const match = await codes.filter(dept => dept.code === code)

        if (isNaN(id)) return res.redirect('/users/login')

        const user = await User.findOne({ where: { userID: id } })

        if (user !== null && match.length > 0) {
            const passMatched = await bcrypt.compare(password, user.dataValues.password)

            if (passMatched && match[0].code.startsWith(user.dataValues.department.substring(0, 3).toUpperCase())) {
                req.session.userId = user.dataValues.userID

                return res.redirect('/users/welcome')

            } else {
                return res.redirect('/users/login')
            }

        } else {
            return res.redirect('/users/login')
        }


    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router;
