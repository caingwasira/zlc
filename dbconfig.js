const { Pool } = require('pg')
const conn = 'postgressql://postgres:zlc2019@localhost:5432/master_database';


const pool = new Pool({
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



