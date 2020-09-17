<<<<<<< HEAD
const { Pool } = require('pg')
const conn = 'postgressql://postgres:ict2077@localhost:5432/zlclimsdb';
=======
const pg = require('pg')
const conn = 'postx://postgres:zlc2019@localhost:5432/test';
>>>>>>> 48fd442c4a0ecd5f27b12dbbd7faa8f311525abc


const pool = new pg.Pool({
    connectionString: conn,
    ssl: false,
    connectionTimeoutMillis: 5000
});

pool.connect( (err, connection) => {
    if(err) {
        console.log('Error occured'+ err)
    }
    console.log("Connection passed!")
})

module.exports = pool;



