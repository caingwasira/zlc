
const pg = require('pg')
const config = require('./config').dev
const conn = `
postgresql://${config.user}:${config.secret}@${config.ip_address}:${config.port}/${config.db_name}`;

const pool = new pg.Pool({
    connectionString: conn,
    ssl: false,
    connectionTimeoutMillis: 5000
});

pool.connect( (err, connection) => {
    if(err) {
       return console.log('Not connected! => db')
    }
    console.log("Connected! => db")
})

module.exports = pool;



