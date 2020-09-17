const { Pool } = require('pg')
const conn = 'postgressql://postgres:ict2077@localhost:5432/zlclimsdb';


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



