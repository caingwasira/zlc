const express = require('express')
const fs = require('fs')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, role, department, zlc_code, mobile_number, password} = req.body

        const userID = Math.floor(Math.random() * 1000000).toString()

        const hash = bcrypt.hashSync(password, saltRounds)

        let errors = []

        if(userID.length !== 6) errors.push('Something went wrong, try again')

        fs.readFile('./api/codes/codes.json', 'utf8', async function(error, result) {
            try {
                const codes = JSON.parse(result)

                const match = await codes.filter( dept => zlc_code === dept.code )

                if(match.length < 1 
                    || department.substring(0, 3).toUpperCase() !== zlc_code.substring(0, 3).toUpperCase()) {
                    errors.push('Ooops! wrong code')
                }

                if(errors.length > 0) {
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
            
                    await user.save()
                    res.send({
                        message: 'Success! You can now login',
                        background: '#adfaad',
                        status: 200
                    })
                }
            } 
            catch (error) {
                res.send(error.message)
            }
            
        })
    } 
    catch (error) {
        res.send(error)
    }
})


router.post('/login', async (req, res) => {
    const { code, password } = req.body
    try {
        fs.readFile('./api/codes/codes.json', 'utf8', async function(error, result) {

            try {
                
                const codes = JSON.parse(result)
    
                const match = codes.filter( dept => dept.code === code)
        
                const user = await User.findAll({ attributes: ['password'] })

                user.forEach( user => {
                    const matchPass = bcrypt.compareSync(password, user.dataValues.password );

                    if(match.length > 0 && matchPass) {
                        res.send('success')
                    }
                })
            } 
            catch (error) {
                console.log('error')
            }
        })
    } 
    catch (error) {
        res.send(error.message)
    }
})



module.exports = router;
