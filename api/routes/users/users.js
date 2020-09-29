const express = require('express')
const fs = require('fs').promises
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')

router.post('/signup', async (req, res, next) => {
    try {
        const { fullName, email, role, department, zlc_code, mobile_number, password} = req.body

        const userID = Math.floor(Math.random() * 1000000).toString()

        const hash = await bcrypt.hashSync(password, 10)

        let errors = []

        const jsonCodes = await fs.readFile('./api/codes/codes.json', 'utf8')

        const codes = await JSON.parse(jsonCodes)

        const match = await codes.filter( dept => zlc_code === dept.code )

        const user = await User.findAll({ attributes: ['email', 'fullName', 'department', 'userID'] })

        const limit = user.filter( user => user.dataValues.department === department)

        if(limit.length === 5) errors.push('Users limit reached for your department')

        const userExist = user.map( user => {
            if(user.dataValues.email === email || user.dataValues.fullName === fullName) {
                return 'User already exist'
            }
        })

        if(userExist[0] !== undefined) errors.push(userExist[0])
        

        if(userID.length !== 6) errors.push('Something went wrong, try again \n')

        if(match.length < 1 
            || department.substring(0, 3).toUpperCase() !== match[0].code.substring(0, 3).toUpperCase()) {
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
        res.send(error)
        console.log(error)
    }
})


router.post('/login', async (req, res, next) => {
    const { id, code, password } = req.body
    
    try {

        const jsonCodes = await fs.readFile('./api/codes/codes.json', 'utf8')
     
        const codes = await JSON.parse(jsonCodes)

        const match = await codes.filter( dept => dept.code === code)

        const users = await User.findAll()

        const user = users.filter( user => user.dataValues.userID === id )

        if(user.length !== 0 ) {

            const matchPass = await bcrypt.compareSync(password, user[0].dataValues.password )

            if(match.length > 0 && matchPass) {

                const token = jwt.sign({user}, 'zlc', { expiresIn: '1500000'})
    
                return res.json({
                    code: 200,
                    token: token
                })
    
            } 
        } else {
    
            return res.json(401)
        }

        
    } 
    catch (error) {
        res.send(error.message)
        console.log(error)
    }
})

module.exports = router;
