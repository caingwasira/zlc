const express = require('express')
const router = express.Router()

// Home View endpoint
router.get('', (req, res) => {
    res.render('home')
})

// AboutUs View Endpoint
router.get('/about', (req, res) => {
    res.render('aboutus')
})


module.exports = router;