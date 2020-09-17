const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:zlc2019@localhost:5432/master_database')

sequelize.authenticate()
.then( () => {
    console.log('Connection has been established successfully')
})
.catch( err => {
    console.log('Unable to connect to the database')
})

const User = sequelize.define('user', {
    // Attributes
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    full_name: { 
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
    zlc_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = User;