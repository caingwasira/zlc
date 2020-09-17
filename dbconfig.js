const pg = require('pg')
const conn = 'postgresql://postgres:zlc2019@localhost:5432/master_database';


const pool = new pg.Pool({
    connectionString: conn,
    ssl: false,
    connectionTimeoutMillis: 5000
});

pool.connect( (err, connection) => {
    if(err) {
       return console.log('Error occured'+ err)
    }
    console.log("Connection passed!")
})

module.exports = pool;



