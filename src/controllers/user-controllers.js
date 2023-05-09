const database = require('../config').promise()
module.exports.getAllUsers = async(req,res) =>{
    try{
        const GET_USERS = 'SELECT * FROM users LIMIT 999'
        const [USER] = await database.execute(GET_USERS);
        
        for(let i=0;i<USER.length;i++){
            delete USER[i].user_password
        }
        res.status(200).send(USER)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports.getUserById = async(req,res) =>{
    let body = req.body
    try{
        const GET_USER_BY_ID = 'SELECT * FROM users WHERE users.user_id = ?'
        const [USER] = await database.execute(GET_USER_BY_ID,[body.id]);
        
        for(let i=0;i<USER.length;i++){
            delete USER[i].user_password
        }
        res.status(200).send(USER)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}