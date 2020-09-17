const pg = require('pg')
const conn = 'postx://postgres:zlc2019@localhost:5432/test';


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



