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
    const sql = `SELECT * FROM ${table} p INNER JOIN beneficiary_details b ON p.subdivision_id = b.subdivision_id`
    const sql1 = `SELECT subdivision_id, surname, first_name, sex FROM ${table}`
    const sql2 = `
    SELECT p.subdivision_id, p.farm_name, p.ward, bo.found_on_farm
     FROM ${table} p
     JOIN boom_sprayers bo
    ON (p.subdivision_id = bo.subdivision_id)
    `
    
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