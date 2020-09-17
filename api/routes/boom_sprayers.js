const express = require('express')
const router = express.Router()
const pool = require('../../dbconfig')
const auth = require('../middleware/auth')

router.get('', (req, res) => {
    res.render('home')
})

router.get('/data', async (req, res) => {
    res.render('index')
})

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

module.exports = router;