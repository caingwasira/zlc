const express = require('express')
const fs = require('fs').promises
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const auth = require('../../middleware/auth')
const { json } = require('body-parser')
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

// Sign Up View Endpoint
router.get('/users/signup_home', auth.redirectDashboard, async (req, res) => {
    res.render('signup')
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

        if (limit.length === 5) errors.push('Users limit reached for your department')

        const userExist = user.map(user => {
            if (user.dataValues.email === email || user.dataValues.fullName === fullName) {
                return 'User already exist'
            }
        })

        if (userExist[0] !== undefined) errors.push(userExist[0])


        if (userID.length !== 6) errors.push('Something went wrong, try again \n')

        if (match.length < 1
            || department.substring(0, 3).toUpperCase() !== match[0].code.substring(0, 3).toUpperCase()) {
            errors.push('Ooops! wrong code')
        }

        if (errors.length > 0) {
            return res.send({
                message: errors,
                background: '#e74'
            })
        } else {
            const user = await new User({
                userID,
                fullName,
                email,
                role,
                department,
                mobile_number,
                date: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
                password: hash
            })

            /* // Configuring SMTP Server details
            const configs = {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                xoauth2: xoauth2.createXOAuth2Generator({
                    user: 'ctgwasira@gmail.com',
                    pass: 'cain7331'
                })
            }

            var poolConfig = {
                pool: true,
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'caintakudzwa@gmail.com',
                    pass: 'cain7331'
                }
            };
            
            let smtpTransport = nodemailer.createTransport(poolConfig)

            smtpTransport.verify((err, success) => {
                if (err) console.error(err);
                console.log('Your config is correct');
            });

            let mailOptions;

            mailOptions = {
                from: 'ctgwasira@gmail.com',
                to: user.email,
                subject: 'Please take note of your Login ID.',
                text: 'Use the following ID to login to your account: ' + user.userID
            }

            await smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.log(error)
                    return res.end('error')
                }
                else {
                    user.save()
                    res.send({
                        message: 'Success! You can now login',
                        background: '#adfaad',
                        status: 200
                    })
                }
            }) */

            await user.save()
            res.send({
                message: 'Success! You can now login',
                background: '#adfaad',
                status: 200
            })
        }
    }
    catch (error) {
        res.send(error)
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

                return res.redirect('/data')

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
