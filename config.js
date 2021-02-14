module.exports = {
    dev : {
        ip_address : '127.0.0.1',
        user: 'postgres',
        secret: 'zlc2019',
        db_name: 'master_database',
        port : 5432,
    },
    
    prod : {
        ip_address : '127.0.0.1',
        port : 5432,
        db_name: 'systems',
        user: 'cain',
        secret: 'zlc2019',
        mongo :{
            url : "mongodb://localhost:27017/story_box_prod",
            options : ""
        }
    }
} 