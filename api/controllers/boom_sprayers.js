const pool = require('../../dbconfig')

let errors = [];
exports.getData = async (req, res, next) => {
    const table = 'spouse_details'
    const sql = `SELECT * FROM ${table}`
    try { 
        const client = await pool.connect()
        const tableData = await client.query(sql)
        const tableRows = tableData.rows
        res.render('index', {
            table: tableRows,
            count: tableRows.length
         })
        
        await client.release();
    } 
    catch (error) {
        errors.push({ message: 'Error encountred while loading the data, try again'});
        if(errors.length > 0) {
            res.render('index', {
                table: errors,
                count: 0
            })
        }
    }
}

exports.postData = async (req, res, next) => {
    const table = req.body.table
    const sql = `SELECT * FROM ${table}`
    try { 
        const client = await pool.connect()
        const tableData = await client.query(sql)
        const tableRows = tableData.rows
        res.send(tableRows)
        
        await client.release();
    } 
    catch (error) {
        errors.push({ message: 'Error encountred while loading the data, try again'});
        if(errors.length > 0) {
            res.render('index', {
                table: errors,
                count: 0
            })
        }
    }
}