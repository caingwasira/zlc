const express = require('express')
const router = express.Router()
const User = require('../models/user')
const pool = require('../../dbconfig')


router.get('/signup_home', async (req, res) => {
    res.render('signup')
})

router.get('/data/users', async (req, res) => {
    try {
        const client = await pool.connect()
        const users = await client.query('SELECT * FROM user')
        const { rows } = users
        res.send(rows)
        await client.release()
    } 
    catch (error) {
        res.send(error)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send(user)
    } 
    catch (error) {
        res.send(error)
        console.log(error)
    }
})

module.exports = router;
