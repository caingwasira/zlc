const express = require('express')
const router = express.Router()
const pool = require('../../../dbconfig')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

// Data View Endpoint
router.get('/data',auth.redirectlogin, async (req, res) => {

    const user = await User.findOne({ where: { userID: req.session.userId }})

    if(user !== null) {
        const name = user.dataValues.fullName.split(" ")
        res.render('index', {
            name: name[1]
        })
    }
})

//Logout
router.get('/logout', auth.redirectlogin, (req, res) => {

    res.status(200).clearCookie('sid')
    req.session.destroy( err => {
        if(err) {
            return res.redirect('/data')
        }
        res.redirect('/users/login')
    })
})

// Data Fetch Endpoint for SQL Queries Executed from the Data View Endpoint
router.get('/data/query', async (req, res, next) => {
    let errors = []
    const { select, fields, from, table } = req.query
    const sql = `${select} ${fields} ${from} ${table}`
    try { 
        const client = await pool.connect()
        const tableData = await client.query(sql)
        const tableRows = tableData.rows
        res.send(tableRows)
        await client.release()
    } 
    catch (error) {
        errors.push({ message: 'Error encountred while loading the data, try again'}, error.message);
        console.log(error.message)
        if(errors.length > 0) {
            res.send({
                table: errors,
                count: 0
            })
        }
    }
})

// Data Fetch Endpoint for Table Name Selected From The Data View Endpoint
router.get('/data/table', async (req, res, next) => {
    const { table, schema } = req.query
    let errors = [];
    const sql = `SELECT * FROM ${schema? schema:'public'}.${table}`
    
    try { 
        const client = await pool.connect()
        const tableData = await client.query(sql)
        const tableRows = tableData.rows
        res.send(tableRows)
        await client.release()
    } 
    catch (error) {
        errors.push({ message: 'Error encountred while loading the data, try again'}, error.message);
        console.log(error.message)
        if(errors.length > 0) {
            res.send({
                table: errors,
                count: 0
            })
        }
    }
})


router.get('/data/table_names', async (req, res, next) => {
    let errors = [];
    const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    
    try { 
        const client = await pool.connect()
        const tableData = await client.query(sql)
        const table_names = tableData.rows
        res.send(table_names)
        await client.release()
    } 
    catch (error) {
        errors.push({ message: 'Error fetching table names, try again'}, error.message);
        console.log(error.message)
        if(errors.length > 0) {
            res.send({
                table: errors,
                count: 0
            })
        }
    }
})

module.exports = router;