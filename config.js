module.exports = {
    dev : {
        ip_address : '127.0.0.1',
        user: 'postgres',
        secret: 'zlc2019',
        db_name: 'master_database',
        port : 5432,
    },
    
    prod : {
        ip_address : '0.0.0.0',
        port : 3000,
        mongo :{
            url : "mongodb://localhost:27017/story_box_prod",
            options : ""
        }
    }
} 