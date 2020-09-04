const express = require('express')
const router = express.Router()
const pool = require('../../dbconfig')

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
    const { table, table2, table3, table4, table5, table6, table7, table8, table9, table10 } = req.query
    let errors = [];
    const sql = `
        SELECT *
        FROM ${table} t1
        JOIN ${table2? table2:table} t2
        ON (t1.subdivision_id = t2.subdivision_id)
        JOIN ${table3? table3:table} t3
        ON (t3.subdivision_id = t2.subdivision_id)
        JOIN ${table4? table4:table} t4
        ON (t4.subdivision_id = t3.subdivision_id)
        JOIN ${table5? table5:table} t5
        ON (t5.subdivision_id = t4.subdivision_id)
        JOIN ${table6? table6:table} t6
        ON (t6.subdivision_id = t5.subdivision_id)
        JOIN ${table7? table7:table} t7
        ON (t7.subdivision_id = t6.subdivision_id)
        JOIN ${table8? table8:table} t8
        ON (t8.subdivision_id = t7.subdivision_id)
        JOIN ${table9? table9:table} t9
        ON (t9.subdivision_id = t8.subdivision_id)
        JOIN ${table10? table10:table} t10
        ON (t10.subdivision_id = t9.subdivision_id)
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