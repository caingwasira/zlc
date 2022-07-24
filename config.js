module.exports = {
    dev : {
        ip_address : '127.0.0.1',
        user: 'postgres',
        secret: 'Orelle@7331',
        db_name: 'orelle',
        port : 5432,
    },
    
    prod : {
        ip_address : '127.0.0.1',
        port : 5432,
        db_name: 'test',
        user: 'cain',
        secret: 'Orelle@7331',
        mongo :{
            url : "mongodb://localhost:27017/story_box_prod",
            options : ""
        }
    }
} 