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

// Legal and Governance View Endpoint
router.get('/legal', (req, res) => {
    res.render('legal')
})

// Internal Audit View Endpoint
router.get('/internal_audit', (req, res) => {
    res.render('internal_audit')
})

// Communications View Endpoint
router.get('/communications', (req, res) => {
    res.render('communications')
})

// Land Audit View Endpoint
router.get('/land_audit', (req, res) => {
    res.render('land_audit')
})

// Corporate Services View Endpoint
router.get('/corporate_services', (req, res) => {
    res.render('corporate_services')
})

// Careers View Endpoint
router.get('/careers', (req, res) => {
    res.render('careers')
})

// ICT View Endpoint
router.get('/ict', (req, res) => {
    res.render('ict')
})

// Sign Up View Endpoint
router.get('/users/signup_home', async (req, res) => {
    res.render('signup')
})

// Sign Up View Endpoint
router.get('/users/login', async (req, res) => {
    res.render('login')
})


module.exports = router;