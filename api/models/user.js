const Sequelize = require('sequelize')
const config = require('../../config').dev
const sequelize = new Sequelize(`postgres://${config.user}:${config.secret}@${config.ip_address}:${config.port}/${config.db_name}`,
 {
    logging: false,
    define: {
        timestamps: false
    }
})

sequelize.authenticate()
.then( () => {
    console.log('Connected! => sequelize')
})
.catch( err => {
    console.log('Not connected! => sequelize')
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