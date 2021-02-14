const Sequelize = require('sequelize')
const config = require('../../config').dev
const conn = `
postgresql://${config.user}:${config.secret}@${config.ip_address}:${config.port}/${config.db_name}`

const sequelize = new Sequelize(
    conn,
 {
    logging: false,
    define: {
        timestamps: false
    }
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
    userID: {
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