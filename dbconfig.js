
const pg = require('pg')
//const config = require('./config').dev
//const conn = `postgresql://${config.user}:${config.secret}@${config.ip_address}:${config.port}/${config.db_name}`;
const conn = 'postgres://lnccscsuoflqva:8fb1ccd4324e799797a18491476e818691d3fa80aa443f76c446ea16c54387be@ec2-44-206-214-233.compute-1.amazonaws.com:5432/da4qcge0164922'
const pool = new pg.Pool({
    connectionString: conn,
    ssl: false,
    connectionTimeoutMillis: 5000
});

pool.connect( (err, connection) => {
    if(err) {
       return console.log('OFF')
    }
    console.log("ON")
})

module.exports = pool;



