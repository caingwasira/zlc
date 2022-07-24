const Sequelize = require('sequelize')
//const config = require('../../config').dev
//const conn = `postgresql://${config.user}:${config.secret}@${config.ip_address}:${config.port}/${config.db_name}`
const conn = 'postgres://lnccscsuoflqva:8fb1ccd4324e799797a18491476e818691d3fa80aa443f76c446ea16c54387be@ec2-44-206-214-233.compute-1.amazonaws.com:5432/da4qcge0164922'
const sequelize = new Sequelize(
    conn,
 {
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
          },
    },
    connectionTimeoutMillis: 100000
})

sequelize.authenticate()
.then( () => {
    console.log('ON')
})
.catch( err => {
    console.log('OFF')
})

const User = sequelize.define('user', {
    // Attributes
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fullName: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile_number: {
        type: Sequelize.STRING,
        allowNull: false
    },

    date: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync().then(function (err) {     
    if(err) {
        console.log(err);
    } 
    else{ 
        console.log('Item table created successfully');
    } 
});


module.exports = User;