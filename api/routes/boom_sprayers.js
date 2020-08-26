const express = require('express')
const router = express.Router()
const pool = require('../../dbconfig')
const { query } = require('../../dbconfig')

router.get('', (req, res) => {
    res.render('home')
})
router.get('/data', async (req, res) => {
    res.render('index')
})

router.get('/data/table', async (req, res, next) => {
    const { table } = req.query
    let errors = [];
    const sql = `SELECT * FROM ${table}`
    
    try { 
        const client = await pool.connect()
        const tableData = await client.query(sql)
        const tableRows = tableData.rows
        res.send(tableRows)
       
        await client.release()
    } 
    catch (error) {
        errors.push({ message: 'Error encountred while loading the data, try again'}, error.message);
        if(errors.length > 0) {
            res.send({
                table: errors,
                count: 0
            })
        }
    }
})

module.exports = router;